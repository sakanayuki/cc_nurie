import { applyRegionPaint, type Paint } from './magic';

interface TapFillOptions {
  getPaint: () => Paint;
  getCurrent: (regionId: string) => Paint | null;
  onFill: (regionId: string, prev: Paint | null, next: Paint) => void;
}

/** タップ塗り: 領域を pointerdown した瞬間に選択色で塗る */
export function setupTapFill(fillSvg: SVGSVGElement, opts: TapFillOptions): void {
  fillSvg.addEventListener('pointerdown', (e) => {
    const target = (e.target as Element).closest<SVGGraphicsElement>('[data-region]');
    if (!target) return;
    const regionId = target.dataset.region;
    if (!regionId) return;
    const next = opts.getPaint();
    const prev = opts.getCurrent(regionId);
    pop(target);
    if (prev === next) return; // 同じ色なら「ぽよん」だけ返す
    applyRegionPaint(fillSvg, target, next);
    opts.onFill(regionId, prev, next);
  });
}

function pop(el: SVGGraphicsElement): void {
  el.classList.remove('poyon');
  void el.getBoundingClientRect(); // アニメーション再始動のためのリフロー
  el.classList.add('poyon');
  el.addEventListener('animationend', () => el.classList.remove('poyon'), { once: true });
}
