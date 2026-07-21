import { PAGES } from './pages';
import { loadState } from './storage';
import { paintToFill } from './paint/magic';

/** 絵選択画面。塗りかけはその状態のままサムネイル表示される */
export function renderSelectScreen(): HTMLElement {
  const root = document.createElement('div');
  root.className = 'select-screen';
  const states = new Map(PAGES.map((p) => [p.id, loadState(p.id)]));
  // 完成済みサムネイルはその場でアニメーションさせる（各ページの完成CSSをまとめて注入）
  root.innerHTML = `
    <style>${PAGES.map((p) => p.completeCss).join('\n')}</style>
    <h1 class="select-title" aria-label="ぬりえ">🖍️🎨</h1>
    <div class="thumb-grid">
      ${PAGES.map(
        (p) => `
        <a class="thumb" href="#/page/${p.id}" data-page="${p.id}">
          <div class="artwork${states.get(p.id)?.completed ? ' is-complete' : ''}">
            <div class="layers">${p.fillSvg}<span class="thumb-crayon-slot"></span>${p.outlineSvg}</div>
          </div>
        </a>`,
      ).join('')}
    </div>`;

  for (const page of PAGES) {
    const thumb = root.querySelector(`.thumb[data-page="${page.id}"]`);
    if (!thumb) continue;
    const state = states.get(page.id) ?? loadState(page.id);
    for (const [regionId, value] of Object.entries(state.regions)) {
      thumb.querySelector(`[data-region="${regionId}"]`)?.setAttribute('fill', paintToFill(value));
    }
    if (state.crayon) {
      const img = document.createElement('img');
      img.className = 'layer';
      img.src = state.crayon;
      img.alt = '';
      thumb.querySelector('.thumb-crayon-slot')?.replaceWith(img);
    }
  }
  return root;
}
