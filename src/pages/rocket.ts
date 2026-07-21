import { buildPage, OUTLINE_COLOR, starPath, type Piece } from './build';

const pieces: Piece[] = [
  // つき
  { tag: 'circle', region: 'moon', group: 'anim-moon', attrs: { cx: 492, cy: 128, r: 56 } },
  { tag: 'circle', deco: true, group: 'anim-moon', attrs: { cx: 478, cy: 112, r: 10, fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 5 } },
  { tag: 'circle', deco: true, group: 'anim-moon', attrs: { cx: 512, cy: 148, r: 7, fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 5 } },
  // ほし ×2
  { tag: 'path', region: 'star1', group: 'anim-star1', attrs: { d: starPath(105, 170, 42), 'stroke-width': 7 } },
  { tag: 'path', region: 'star2', group: 'anim-star2', attrs: { d: starPath(505, 430, 34), 'stroke-width': 7 } },
  // ほのお（本体のしたに隠れる位置から生える）
  { tag: 'path', region: 'flame-outer', group: 'anim-flame', attrs: { d: 'M 252 570 Q 256 652 300 708 Q 344 652 348 570 Z' } },
  { tag: 'path', region: 'flame-inner', group: 'anim-flame', attrs: { d: 'M 276 570 Q 280 622 300 654 Q 320 622 324 570 Z', 'stroke-width': 6 } },
  // はね
  { tag: 'path', region: 'fin-left', attrs: { d: 'M 243 452 Q 168 496 162 604 Q 214 566 243 560 Z' } },
  { tag: 'path', region: 'fin-right', attrs: { d: 'M 357 452 Q 432 496 438 604 Q 386 566 357 560 Z' } },
  // どうたい・せんとう・まど
  { tag: 'path', region: 'body', attrs: { d: 'M 238 305 L 362 305 L 368 570 L 232 570 Z' } },
  { tag: 'path', region: 'nose', attrs: { d: 'M 238 305 Q 250 165 300 112 Q 350 165 362 305 Z' } },
  { tag: 'circle', region: 'window', attrs: { cx: 300, cy: 392, r: 48, 'stroke-width': 7 } },
];

const css = `
.artwork.is-complete .layers { animation: rocket-fly 2.2s ease-in-out infinite alternate; }
@keyframes rocket-fly {
  from { transform: translateY(6px) rotate(-0.6deg); }
  to { transform: translateY(-26px) rotate(0.8deg); }
}
.artwork.is-complete .anim-flame { transform-box: fill-box; transform-origin: 50% 0%; animation: rocket-flame 0.16s linear infinite alternate; }
@keyframes rocket-flame { from { transform: scaleY(0.72); } to { transform: scaleY(1.08); } }
.artwork.is-complete .anim-star1 { transform-box: fill-box; transform-origin: center; animation: rocket-star 1.4s ease-in-out infinite; }
.artwork.is-complete .anim-star2 { transform-box: fill-box; transform-origin: center; animation: rocket-star 1.8s ease-in-out 0.4s infinite; }
@keyframes rocket-star { 0%, 100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.25) rotate(12deg); } }
.artwork.is-complete .anim-moon { animation: rocket-moon 2.6s ease-in-out infinite; }
@keyframes rocket-moon { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.25); } }
`;

export const rocket = buildPage({ id: 'rocket', pieces, css });
