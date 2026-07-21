/** マジックブラシ（にじいろ・キラキラ）の描画定義 */

export type Paint = string; // CSS カラー or 'rainbow' | 'sparkle'

const SVG_NS = 'http://www.w3.org/2000/svg';

const RAINBOW_STOPS = ['#ff5a5a', '#ff9d3c', '#ffe14d', '#7ed957', '#4fc3f7', '#7a6ff0', '#e17ce1'];

export const MAGIC_DEFS = `<defs>
<linearGradient id="magic-rainbow" x1="0" y1="0" x2="1" y2="1">
${RAINBOW_STOPS.map(
  (c, i) => `<stop offset="${(i / (RAINBOW_STOPS.length - 1)).toFixed(3)}" stop-color="${c}"/>`,
).join('')}
</linearGradient>
<radialGradient id="magic-sparkle" cx="0.5" cy="0.4" r="0.85">
<stop offset="0" stop-color="#fff7cf"/>
<stop offset="0.6" stop-color="#ffe066"/>
<stop offset="1" stop-color="#ffc93c"/>
</radialGradient>
</defs>`;

const STAR_D = 'M0 -9 L2.2 -2.2 L9 0 L2.2 2.2 L0 9 L-2.2 2.2 L-9 0 L-2.2 -2.2 Z';

export function paintToFill(paint: Paint): string {
  if (paint === 'rainbow') return 'url(#magic-rainbow)';
  if (paint === 'sparkle') return 'url(#magic-sparkle)';
  return paint;
}

/** 領域に塗り値を適用する（キラキラの星の生成・除去も担う） */
export function applyRegionPaint(
  fillSvg: SVGSVGElement,
  region: SVGGraphicsElement,
  paint: Paint,
): void {
  const id = region.dataset.region ?? '';
  fillSvg.querySelector(`g.stars[data-for="${id}"]`)?.remove();
  region.setAttribute('fill', paintToFill(paint));
  if (paint === 'sparkle') addStars(fillSvg, region, id);
}

function addStars(fillSvg: SVGSVGElement, region: SVGGraphicsElement, id: string): void {
  const g = document.createElementNS(SVG_NS, 'g');
  g.setAttribute('class', 'stars');
  g.dataset.for = id;
  let box: DOMRect;
  try {
    box = region.getBBox();
  } catch {
    return;
  }
  if (box.width === 0 || box.height === 0) return;
  const geo = region as unknown as SVGGeometryElement;
  let placed = 0;
  let tries = 0;
  while (placed < 6 && tries < 60) {
    tries++;
    const x = box.x + Math.random() * box.width;
    const y = box.y + Math.random() * box.height;
    let inside = true;
    try {
      inside = typeof geo.isPointInFill === 'function' ? geo.isPointInFill(new DOMPoint(x, y)) : true;
    } catch {
      inside = true;
    }
    if (!inside) continue;
    // 位置は外側の <g> の translate で決め、内側の path をきらめかせる
    // （CSS transform アニメーションが translate を上書きしないように分離する）
    const wrap = document.createElementNS(SVG_NS, 'g');
    wrap.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(0.7 + Math.random() * 0.9).toFixed(2)})`);
    const s = document.createElementNS(SVG_NS, 'path');
    s.setAttribute('d', STAR_D);
    s.setAttribute('fill', '#ffffff');
    s.setAttribute('class', 'magic-star');
    s.style.animationDelay = `${(Math.random() * 1.2).toFixed(2)}s`;
    wrap.append(s);
    g.append(wrap);
    placed++;
  }
  fillSvg.append(g);
}
