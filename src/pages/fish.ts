import { buildPage, OUTLINE_COLOR, type Piece } from './build';

const pieces: Piece[] = [
  // 海藻
  { tag: 'path', region: 'seaweed', attrs: { d: 'M 70 800 C 45 700 105 655 80 555 C 135 605 118 700 150 800 Z' } },
  // しっぽ（からだのうしろ）
  { tag: 'path', region: 'tail', group: 'anim-tail', attrs: { d: 'M 415 380 L 545 285 Q 570 380 545 475 Z' } },
  // 背びれ・腹びれ
  { tag: 'path', region: 'fin-top', attrs: { d: 'M 235 280 Q 270 185 365 205 Q 320 265 295 288 Z' } },
  { tag: 'path', region: 'fin-bottom', attrs: { d: 'M 245 485 Q 285 580 375 555 Q 330 500 300 478 Z' } },
  // からだ
  { tag: 'ellipse', region: 'body', attrs: { cx: 280, cy: 380, rx: 170, ry: 115 } },
  // えら・目・くち（デコ）
  {
    tag: 'path',
    deco: true,
    attrs: { d: 'M 235 295 Q 195 380 235 462', fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 8, 'stroke-linecap': 'round' },
  },
  { tag: 'circle', deco: true, group: 'anim-eye', attrs: { cx: 185, cy: 345, r: 17, fill: OUTLINE_COLOR } },
  { tag: 'circle', deco: true, group: 'anim-eye', attrs: { cx: 191, cy: 339, r: 6, fill: '#ffffff' } },
  {
    tag: 'path',
    deco: true,
    attrs: { d: 'M 120 408 Q 143 428 168 412', fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 8, 'stroke-linecap': 'round' },
  },
  // あわ ×3
  { tag: 'circle', region: 'bubble1', group: 'anim-bubble1', attrs: { cx: 468, cy: 150, r: 40 } },
  { tag: 'circle', region: 'bubble2', group: 'anim-bubble2', attrs: { cx: 532, cy: 245, r: 27, 'stroke-width': 7 } },
  { tag: 'circle', region: 'bubble3', group: 'anim-bubble3', attrs: { cx: 420, cy: 82, r: 23, 'stroke-width': 7 } },
];

const css = `
.artwork.is-complete .layers { animation: fish-swim 3.2s ease-in-out infinite; }
@keyframes fish-swim {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-12px, -10px) rotate(-1.5deg); }
  70% { transform: translate(10px, 8px) rotate(1.5deg); }
}
.artwork.is-complete .anim-tail { transform-box: fill-box; transform-origin: 0% 50%; animation: fish-tail 0.55s ease-in-out infinite alternate; }
@keyframes fish-tail { from { transform: rotate(-9deg); } to { transform: rotate(11deg); } }
.artwork.is-complete .anim-eye { transform-box: fill-box; transform-origin: center; animation: fish-blink 3.4s infinite; }
@keyframes fish-blink { 0%, 91%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.12); } }
.artwork.is-complete .anim-bubble1 { animation: fish-bubble 2.8s linear infinite; }
.artwork.is-complete .anim-bubble2 { animation: fish-bubble 3.6s linear 0.5s infinite; }
.artwork.is-complete .anim-bubble3 { animation: fish-bubble 2.3s linear 1s infinite; }
@keyframes fish-bubble {
  0% { transform: translateY(0); opacity: 1; }
  85% { opacity: 1; }
  100% { transform: translateY(-130px); opacity: 0; }
}
`;

export const fish = buildPage({ id: 'fish', pieces, css });
