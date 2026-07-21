import { buildPage, OUTLINE_COLOR, rotatedEllipsePath, sunRaysPath, type Piece } from './build';

// はなびら6枚を中心 (300,330) のまわりに生成
const petals: Piece[] = Array.from({ length: 6 }, (_, i) => {
  const deg = i * 60;
  const rad = (deg * Math.PI) / 180;
  const cx = 300 + 95 * Math.sin(rad);
  const cy = 330 - 95 * Math.cos(rad);
  return {
    tag: 'path',
    region: `petal-${i + 1}`,
    group: 'anim-petals',
    attrs: { d: rotatedEllipsePath(cx, cy, 47, 68, deg) },
  };
});

const pieces: Piece[] = [
  // たいよう
  { tag: 'circle', region: 'sun', group: 'anim-fl-sun', attrs: { cx: 92, cy: 100, r: 52 } },
  {
    tag: 'path',
    deco: true,
    group: 'anim-fl-sun',
    attrs: { d: sunRaysPath(92, 100, 66, 90), fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 7, 'stroke-linecap': 'round' },
  },
  // くも
  {
    tag: 'path',
    region: 'cloud',
    group: 'anim-cloud',
    attrs: {
      d: 'M 382 168 Q 380 128 418 124 Q 428 92 468 96 Q 508 88 518 122 Q 552 128 546 158 Q 542 186 505 186 L 408 186 Q 384 186 382 168 Z',
      'stroke-width': 8,
    },
  },
  // くき・はっぱ
  { tag: 'path', region: 'stem', attrs: { d: 'M 288 470 C 282 560 294 645 290 755 L 320 755 C 316 645 322 560 314 470 Z', 'stroke-width': 7 } },
  { tag: 'path', region: 'leaf-left', attrs: { d: 'M 290 625 Q 195 585 168 518 Q 262 540 296 600 Z' } },
  { tag: 'path', region: 'leaf-right', attrs: { d: 'M 310 655 Q 405 620 435 552 Q 340 575 306 630 Z' } },
  // はなびら＋まんなか（完成するとゆっくり回る）
  ...petals,
  { tag: 'circle', region: 'center', group: 'anim-petals', attrs: { cx: 300, cy: 330, r: 64 } },
  // ちょうちょ（完成したら飛んでくる）
  {
    tag: 'path',
    deco: true,
    group: 'anim-butterfly',
    attrs: {
      d: 'M 470 288 Q 440 258 432 286 Q 428 306 462 306 Q 428 306 434 328 Q 442 348 470 316 M 470 288 Q 500 258 508 286 Q 512 306 478 306 Q 512 306 506 328 Q 498 348 470 316',
      fill: '#f6a5c0',
      stroke: OUTLINE_COLOR,
      'stroke-width': 6,
      'stroke-linejoin': 'round',
    },
  },
  { tag: 'ellipse', deco: true, group: 'anim-butterfly', attrs: { cx: 470, cy: 302, rx: 7, ry: 20, fill: OUTLINE_COLOR } },
];

const css = `
.artwork.is-complete .layers { transform-origin: 50% 95%; animation: flower-sway 2.8s ease-in-out infinite; }
@keyframes flower-sway { 0%, 100% { transform: rotate(-1.6deg); } 50% { transform: rotate(1.6deg); } }
.artwork.is-complete .anim-petals { transform-box: view-box; transform-origin: 300px 330px; animation: flower-spin 14s linear infinite; }
@keyframes flower-spin { to { transform: rotate(360deg); } }
.anim-butterfly { opacity: 0; transition: opacity 0.6s; }
.artwork.is-complete .anim-butterfly { opacity: 1; transform-box: fill-box; transform-origin: center; animation: flower-butterfly 2.4s ease-in-out infinite; }
@keyframes flower-butterfly {
  0%, 100% { transform: translate(0, 0) rotate(-6deg); }
  30% { transform: translate(-28px, -34px) rotate(5deg); }
  65% { transform: translate(-60px, -6px) rotate(-4deg); }
}
.artwork.is-complete .anim-cloud { animation: flower-cloud 6s ease-in-out infinite; }
@keyframes flower-cloud { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-26px); } }
.artwork.is-complete .anim-fl-sun { transform-box: fill-box; transform-origin: center; animation: flower-sun 10s linear infinite; }
@keyframes flower-sun { to { transform: rotate(360deg); } }
`;

export const flower = buildPage({ id: 'flower', pieces, css });
