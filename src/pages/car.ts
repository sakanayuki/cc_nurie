import { buildPage, OUTLINE_COLOR, sunRaysPath, type Piece } from './build';

function spokes(cx: number, cy: number): string {
  return sunRaysPath(cx, cy, 0, 50, 4);
}

const pieces: Piece[] = [
  // たいよう
  { tag: 'circle', region: 'sun', group: 'anim-car-sun', attrs: { cx: 95, cy: 108, r: 56 } },
  {
    tag: 'path',
    deco: true,
    group: 'anim-car-sun',
    attrs: { d: sunRaysPath(95, 108, 70, 96), fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 7, 'stroke-linecap': 'round' },
  },
  // どうろ（デコ・完成するとながれる）
  {
    tag: 'path',
    deco: true,
    group: 'anim-road',
    attrs: { d: 'M -80 690 L 680 690', fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 9, 'stroke-linecap': 'round', 'stroke-dasharray': '46 32' },
  },
  // しゃたい（キャビン→ボディの順で描き、境目をボディで隠す）
  { tag: 'path', region: 'cabin', group: 'anim-car-body', attrs: { d: 'M 155 475 Q 168 372 245 368 L 355 368 Q 432 372 445 475 Z' } },
  {
    tag: 'path',
    region: 'body',
    group: 'anim-car-body',
    attrs: { d: 'M 68 522 Q 68 468 122 468 L 478 468 Q 532 468 532 522 L 532 585 Q 532 608 505 608 L 95 608 Q 68 608 68 585 Z' },
  },
  { tag: 'path', region: 'window-back', group: 'anim-car-body', attrs: { d: 'M 190 460 Q 198 396 252 392 L 285 392 L 285 460 Z', 'stroke-width': 7 } },
  { tag: 'path', region: 'window-front', group: 'anim-car-body', attrs: { d: 'M 315 392 L 348 392 Q 402 396 410 460 L 315 460 Z', 'stroke-width': 7 } },
  { tag: 'circle', region: 'headlight', group: 'anim-car-body', attrs: { cx: 497, cy: 542, r: 26, 'stroke-width': 7 } },
  // タイヤ（うしろ・まえ）
  { tag: 'circle', region: 'wheel-back', group: 'anim-wheel-back', attrs: { cx: 165, cy: 612, r: 62 } },
  { tag: 'circle', region: 'hub-back', group: 'anim-wheel-back', attrs: { cx: 165, cy: 612, r: 28, 'stroke-width': 7 } },
  {
    tag: 'path',
    deco: true,
    group: 'anim-wheel-back',
    attrs: { d: spokes(165, 612), fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 6, 'stroke-linecap': 'round' },
  },
  { tag: 'circle', region: 'wheel-front', group: 'anim-wheel-front', attrs: { cx: 435, cy: 612, r: 62 } },
  { tag: 'circle', region: 'hub-front', group: 'anim-wheel-front', attrs: { cx: 435, cy: 612, r: 28, 'stroke-width': 7 } },
  {
    tag: 'path',
    deco: true,
    group: 'anim-wheel-front',
    attrs: { d: spokes(435, 612), fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 6, 'stroke-linecap': 'round' },
  },
];

const css = `
.artwork.is-complete .layers { animation: car-drive 1.6s ease-in-out infinite; }
@keyframes car-drive { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(12px); } }
.artwork.is-complete .anim-car-body { animation: car-bounce 0.45s ease-in-out infinite alternate; }
@keyframes car-bounce { from { transform: translateY(0); } to { transform: translateY(-7px); } }
.artwork.is-complete .anim-wheel-back,
.artwork.is-complete .anim-wheel-front { transform-box: fill-box; transform-origin: center; animation: car-wheel 0.9s linear infinite; }
@keyframes car-wheel { to { transform: rotate(360deg); } }
.artwork.is-complete .anim-road { animation: car-road 0.7s linear infinite; }
@keyframes car-road { to { transform: translateX(-78px); } }
.artwork.is-complete .anim-car-sun { transform-box: fill-box; transform-origin: center; animation: car-sun 9s linear infinite; }
@keyframes car-sun { to { transform: rotate(360deg); } }
`;

export const car = buildPage({ id: 'car', pieces, css });
