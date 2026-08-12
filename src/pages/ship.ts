import { buildPage, cloudPath, OUTLINE_COLOR, sunRaysPath, type Piece } from './build';

const pieces: Piece[] = [
  // たいよう
  { tag: 'circle', region: 'sun', group: 'anim-ship-sun', attrs: { cx: 492, cy: 118, r: 56 } },
  {
    tag: 'path',
    deco: true,
    group: 'anim-ship-sun',
    attrs: { d: sunRaysPath(492, 118, 70, 96), fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 7, 'stroke-linecap': 'round' },
  },
  // くも
  { tag: 'path', region: 'cloud', group: 'anim-ship-cloud', attrs: { d: cloudPath(140, 128, 86), 'stroke-width': 8 } },
  // かもめ（デコ・完成すると横切る）
  {
    tag: 'path',
    deco: true,
    group: 'anim-gull',
    attrs: {
      d: 'M 40 286 Q 70 250 100 286 Q 130 250 160 286',
      fill: 'none',
      stroke: OUTLINE_COLOR,
      'stroke-width': 8,
      'stroke-linecap': 'round',
    },
  },
  // ふね本体（マスト→はた→ほ→せんたい→デッキ→まど）
  {
    tag: 'path',
    deco: true,
    group: 'anim-boat',
    attrs: { d: 'M 300 172 L 300 500', fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 12, 'stroke-linecap': 'round' },
  },
  { tag: 'path', region: 'flag', group: 'anim-boat', attrs: { d: 'M 306 168 L 400 200 L 306 232 Z', 'stroke-width': 7 } },
  { tag: 'path', region: 'sail-big', group: 'anim-boat', attrs: { d: 'M 286 206 L 286 468 L 96 468 Z' } },
  { tag: 'path', region: 'sail-small', group: 'anim-boat', attrs: { d: 'M 314 252 L 314 468 L 458 468 Z' } },
  {
    tag: 'path',
    region: 'hull',
    group: 'anim-boat',
    attrs: { d: 'M 74 484 L 526 484 L 470 606 Q 464 618 448 618 L 152 618 Q 136 618 130 606 Z' },
  },
  { tag: 'path', region: 'deck', group: 'anim-boat', attrs: { d: 'M 92 508 L 508 508 L 496 540 L 104 540 Z', 'stroke-width': 7 } },
  { tag: 'circle', region: 'window-left', group: 'anim-boat', attrs: { cx: 228, cy: 570, r: 30, 'stroke-width': 7 } },
  { tag: 'circle', region: 'window-right', group: 'anim-boat', attrs: { cx: 372, cy: 570, r: 30, 'stroke-width': 7 } },
  // なみ（ふねの手前・左右にゆれる）
  {
    tag: 'path',
    region: 'wave-front',
    group: 'anim-wave-front',
    attrs: {
      d: 'M -140 640 Q -50 600 40 640 Q 130 680 220 640 Q 310 600 400 640 Q 490 680 580 640 Q 670 600 740 636 L 740 732 L -140 732 Z',
      'stroke-width': 8,
    },
  },
  {
    tag: 'path',
    region: 'wave-back',
    group: 'anim-wave-back',
    attrs: {
      d: 'M -140 730 Q -50 690 40 730 Q 130 770 220 730 Q 310 690 400 730 Q 490 770 580 730 Q 670 690 740 726 L 740 812 L -140 812 Z',
      'stroke-width': 8,
    },
  },
];

const css = `
.artwork.is-complete .anim-boat { transform-box: fill-box; transform-origin: 50% 100%; animation: ship-rock 3s ease-in-out infinite; }
@keyframes ship-rock {
  0%, 100% { transform: rotate(-3deg) translateY(0); }
  50% { transform: rotate(3deg) translateY(-12px); }
}
.artwork.is-complete .anim-wave-front { animation: ship-wave 3.4s ease-in-out infinite; }
.artwork.is-complete .anim-wave-back { animation: ship-wave 4.6s ease-in-out 0.8s infinite reverse; }
@keyframes ship-wave { 0%, 100% { transform: translateX(-46px); } 50% { transform: translateX(46px); } }
.anim-gull { opacity: 0; transition: opacity 0.6s; }
.artwork.is-complete .anim-gull { opacity: 1; animation: ship-gull 7s linear infinite; }
@keyframes ship-gull {
  0% { transform: translate(-140px, 40px) scale(0.8); }
  100% { transform: translate(560px, -30px) scale(1.05); }
}
.artwork.is-complete .anim-ship-cloud { animation: ship-cloud 8s ease-in-out infinite; }
@keyframes ship-cloud { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(38px); } }
.artwork.is-complete .anim-ship-sun { transform-box: fill-box; transform-origin: center; animation: ship-sun 11s linear infinite; }
@keyframes ship-sun { to { transform: rotate(360deg); } }
`;

export const ship = buildPage({ id: 'ship', pieces, css });
