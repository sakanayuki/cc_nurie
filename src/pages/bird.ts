import { buildPage, cloudPath, OUTLINE_COLOR, sunRaysPath, type Piece } from './build';

const pieces: Piece[] = [
  // たいよう
  { tag: 'circle', region: 'sun', group: 'anim-bird-sun', attrs: { cx: 492, cy: 116, r: 50 } },
  {
    tag: 'path',
    deco: true,
    group: 'anim-bird-sun',
    attrs: { d: sunRaysPath(492, 116, 64, 88), fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 7, 'stroke-linecap': 'round' },
  },
  // くも ×2
  { tag: 'path', region: 'cloud-top', group: 'anim-cloud-top', attrs: { d: cloudPath(140, 150, 84), 'stroke-width': 8 } },
  { tag: 'path', region: 'cloud-bottom', group: 'anim-cloud-bottom', attrs: { d: cloudPath(456, 700, 74), 'stroke-width': 8 } },
  // しっぽ（からだの左うしろに扇形でつく）
  { tag: 'path', region: 'tail', group: 'anim-tail', attrs: { d: 'M 196 396 L 52 342 Q 36 420 54 496 L 200 450 Z' } },
  // からだ・あたま
  { tag: 'ellipse', region: 'body', attrs: { cx: 300, cy: 430, rx: 140, ry: 106 } },
  { tag: 'circle', region: 'head', attrs: { cx: 392, cy: 302, r: 84 } },
  // とさか・くちばし
  { tag: 'path', region: 'crest', attrs: { d: 'M 372 220 Q 380 160 418 150 Q 402 190 426 222 Z', 'stroke-width': 7 } },
  { tag: 'path', region: 'beak', attrs: { d: 'M 468 276 L 552 302 L 468 330 Z', 'stroke-width': 7 } },
  // つばさ（からだの上・はばたく）
  { tag: 'path', region: 'wing', group: 'anim-wing', attrs: { d: 'M 312 402 Q 246 268 132 244 Q 176 378 276 434 Z' } },
  // おちてくる はね
  {
    tag: 'path',
    region: 'feather',
    group: 'anim-feather',
    attrs: { d: 'M 146 620 Q 190 562 238 598 Q 212 664 146 620 Z', 'stroke-width': 7 },
  },
  {
    tag: 'path',
    deco: true,
    group: 'anim-feather',
    attrs: { d: 'M 156 616 Q 194 588 230 598', fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 5, 'stroke-linecap': 'round' },
  },
  // め（デコ）
  { tag: 'circle', deco: true, group: 'anim-eye', attrs: { cx: 416, cy: 286, r: 15, fill: OUTLINE_COLOR } },
  { tag: 'circle', deco: true, group: 'anim-eye', attrs: { cx: 422, cy: 280, r: 5, fill: '#ffffff' } },
];

const css = `
.artwork.is-complete .layers { animation: bird-fly 2.4s ease-in-out infinite; }
@keyframes bird-fly {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(12px, -32px) rotate(-2deg); }
}
.artwork.is-complete .anim-wing { transform-box: fill-box; transform-origin: 100% 100%; animation: bird-wing 0.44s ease-in-out infinite alternate; }
@keyframes bird-wing { from { transform: rotate(-16deg); } to { transform: rotate(16deg); } }
.artwork.is-complete .anim-tail { transform-box: fill-box; transform-origin: 100% 50%; animation: bird-tail 1.2s ease-in-out infinite alternate; }
@keyframes bird-tail { from { transform: rotate(-5deg); } to { transform: rotate(7deg); } }
.artwork.is-complete .anim-eye { transform-box: fill-box; transform-origin: center; animation: bird-blink 3.6s infinite; }
@keyframes bird-blink { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.12); } }
.artwork.is-complete .anim-feather { transform-box: fill-box; transform-origin: center; animation: bird-feather 4.2s ease-in-out infinite; }
@keyframes bird-feather {
  0% { transform: translate(0, -64px) rotate(-20deg); opacity: 0; }
  15%, 85% { opacity: 1; }
  100% { transform: translate(-34px, 92px) rotate(24deg); opacity: 0; }
}
.artwork.is-complete .anim-cloud-top { animation: bird-cloud 7s ease-in-out infinite; }
.artwork.is-complete .anim-cloud-bottom { animation: bird-cloud 9s ease-in-out 1s infinite; }
@keyframes bird-cloud { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-30px); } }
.artwork.is-complete .anim-bird-sun { transform-box: fill-box; transform-origin: center; animation: bird-sun 12s linear infinite; }
@keyframes bird-sun { to { transform: rotate(360deg); } }
`;

export const bird = buildPage({ id: 'bird', pieces, css });
