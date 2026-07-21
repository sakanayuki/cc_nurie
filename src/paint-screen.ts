import type { ColoringPage } from './pages/types';
import { loadState, saveState, clearState, type SavedState } from './storage';
import { setupTapFill } from './paint/tap-fill';
import { setupCrayon } from './paint/crayon';
import { applyRegionPaint, type Paint } from './paint/magic';
import { History } from './paint/history';
import { isComplete, celebrate } from './paint/complete';

const COLORS = [
  '#e94b35', // あか
  '#f6871f', // オレンジ
  '#fdd835', // きいろ
  '#8bc34a', // きみどり
  '#2e9e4f', // みどり
  '#4fc3f7', // みずいろ
  '#1976d2', // あお
  '#8e5bc7', // むらさき
  '#f48fb1', // ピンク
  '#8d6e63', // ちゃいろ
  '#9aa0a6', // グレー
  '#40454a', // くろ
];

const CLEAR_HOLD_MS = 1500;

export function renderPaintScreen(page: ColoringPage): HTMLElement {
  const state: SavedState = loadState(page.id);
  const history = new History();
  let paint: Paint = COLORS[0];

  const root = document.createElement('div');
  root.className = 'paint-screen';
  root.innerHTML = `
    <style>${page.completeCss}</style>
    <div class="canvas-area">
      <a class="home-btn" href="#/" aria-label="えらぶがめんへもどる">🏠</a>
      <div class="artwork mode-tap" data-page="${page.id}">
        <div class="layers">
          ${page.fillSvg}
          <canvas class="layer crayon-layer" width="600" height="800"></canvas>
          ${page.outlineSvg}
        </div>
      </div>
    </div>
    <div class="palette">
      ${COLORS.map((c) => `<button class="swatch" data-paint="${c}" style="background:${c}" aria-label="いろをえらぶ"></button>`).join('')}
      <button class="swatch swatch-rainbow" data-paint="rainbow" aria-label="にじいろ"></button>
      <button class="swatch swatch-sparkle" data-paint="sparkle" aria-label="きらきら">✨</button>
    </div>
    <div class="toolbar">
      <button class="tool mode-btn selected" data-mode="tap" aria-label="タップぬり">👆</button>
      <button class="tool mode-btn" data-mode="crayon" aria-label="クレヨン">🖍️</button>
      <button class="tool undo-btn" aria-label="ひとつもどす">↩️</button>
      <button class="tool trash-btn" aria-label="ぜんぶけす（ながおし）"><span class="trash-ring"></span><span class="trash-icon">🗑️</span></button>
    </div>`;

  const artwork = root.querySelector<HTMLElement>('.artwork');
  const fillSvg = root.querySelector<SVGSVGElement>('.fill-layer');
  const canvas = root.querySelector<HTMLCanvasElement>('.crayon-layer');
  if (!artwork || !fillSvg || !canvas) return root;

  const save = (): void => saveState(page.id, state);

  const refreshComplete = (celebrateNow: boolean): void => {
    const done = isComplete(state.regions, page.regionIds);
    if (done && !state.completed) {
      state.completed = true;
      artwork.classList.add('is-complete');
      if (celebrateNow) celebrate();
    } else if (!done) {
      state.completed = false;
      artwork.classList.remove('is-complete');
    } else {
      artwork.classList.add('is-complete');
    }
  };

  setupTapFill(fillSvg, {
    getPaint: () => paint,
    getCurrent: (regionId) => state.regions[regionId] ?? null,
    onFill: (regionId, prev, next) => {
      state.regions[regionId] = next;
      history.push({ type: 'fill', regionId, prev, next });
      refreshComplete(true);
      save();
    },
  });

  const crayon = setupCrayon(canvas, {
    getPaint: () => paint,
    onStrokeStart: (before) => history.push({ type: 'stroke', before }),
    onStrokeEnd: (after) => {
      state.crayon = after;
      save();
    },
  });

  // パレット
  root.querySelectorAll<HTMLButtonElement>('.swatch').forEach((btn) => {
    btn.addEventListener('pointerdown', () => {
      paint = btn.dataset.paint ?? COLORS[0];
      root.querySelectorAll('.swatch.selected').forEach((s) => s.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });
  root.querySelector('.swatch')?.classList.add('selected');

  // モード切替
  root.querySelectorAll<HTMLButtonElement>('.mode-btn').forEach((btn) => {
    btn.addEventListener('pointerdown', () => {
      const mode = btn.dataset.mode === 'crayon' ? 'crayon' : 'tap';
      root.querySelectorAll('.mode-btn.selected').forEach((s) => s.classList.remove('selected'));
      btn.classList.add('selected');
      artwork.classList.toggle('mode-tap', mode === 'tap');
      artwork.classList.toggle('mode-crayon', mode === 'crayon');
    });
  });

  // アンドゥ
  root.querySelector('.undo-btn')?.addEventListener('pointerdown', () => {
    const op = history.pop();
    if (!op) return;
    if (op.type === 'fill') {
      const el = fillSvg.querySelector<SVGGraphicsElement>(`[data-region="${op.regionId}"]`);
      if (op.prev) {
        state.regions[op.regionId] = op.prev;
        if (el) applyRegionPaint(fillSvg, el, op.prev);
      } else {
        delete state.regions[op.regionId];
        if (el) applyRegionPaint(fillSvg, el, '#ffffff');
      }
    } else {
      crayon.loadFrom(op.before);
      state.crayon = op.before;
    }
    refreshComplete(false);
    save();
  });

  // 全消し（長押しのみ・誤タップでは発動しない）
  const trashBtn = root.querySelector<HTMLButtonElement>('.trash-btn');
  const ring = root.querySelector<HTMLElement>('.trash-ring');
  if (trashBtn && ring) {
    let armTimer = 0;
    let armStart = 0;
    let raf = 0;
    const tick = (): void => {
      const progress = Math.min(1, (performance.now() - armStart) / CLEAR_HOLD_MS);
      ring.style.background = `conic-gradient(#e94b35 ${(progress * 360).toFixed(0)}deg, transparent 0deg)`;
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    const disarm = (): void => {
      clearTimeout(armTimer);
      cancelAnimationFrame(raf);
      ring.style.background = 'none';
    };
    trashBtn.addEventListener('pointerdown', (e) => {
      trashBtn.setPointerCapture(e.pointerId);
      armStart = performance.now();
      raf = requestAnimationFrame(tick);
      armTimer = window.setTimeout(() => {
        disarm();
        resetAll();
      }, CLEAR_HOLD_MS);
    });
    trashBtn.addEventListener('pointerup', disarm);
    trashBtn.addEventListener('pointercancel', disarm);
  }

  const resetAll = (): void => {
    state.regions = {};
    state.crayon = null;
    state.completed = false;
    history.clear();
    fillSvg
      .querySelectorAll<SVGGraphicsElement>('[data-region]')
      .forEach((el) => applyRegionPaint(fillSvg, el, '#ffffff'));
    crayon.clear();
    artwork.classList.remove('is-complete');
    clearState(page.id);
  };

  // 塗りかけの復元（getBBox が使えるよう描画後に行う）
  requestAnimationFrame(() => {
    for (const [regionId, value] of Object.entries(state.regions)) {
      const el = fillSvg.querySelector<SVGGraphicsElement>(`[data-region="${regionId}"]`);
      if (el) applyRegionPaint(fillSvg, el, value);
    }
    crayon.loadFrom(state.crayon);
    refreshComplete(false);
  });

  return root;
}
