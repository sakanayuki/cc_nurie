import { buildPage, cloudPath, OUTLINE_COLOR, starPath, type Piece } from './build';

const pieces: Piece[] = [
  // よるのおか
  {
    tag: 'path',
    region: 'hill',
    attrs: { d: 'M -20 700 Q 160 646 320 694 Q 470 738 620 686 L 620 812 L -20 812 Z', 'stroke-width': 8 },
  },
  // くも
  { tag: 'path', region: 'cloud', group: 'anim-moon-cloud', attrs: { d: cloudPath(452, 620, 84), 'stroke-width': 8 } },
  // おつきさま（みかづき＋かお）
  {
    tag: 'path',
    region: 'moon',
    group: 'anim-moon-body',
    attrs: { d: 'M 331 109 A 150 150 0 1 0 331 361 A 128 128 0 1 1 331 109 Z' },
  },
  { tag: 'circle', deco: true, group: 'anim-moon-body', attrs: { cx: 150, cy: 200, r: 12, fill: OUTLINE_COLOR } },
  {
    tag: 'path',
    deco: true,
    group: 'anim-moon-body',
    attrs: { d: 'M 118 246 Q 142 274 168 244', fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 8, 'stroke-linecap': 'round' },
  },
  // ほし ×6（またたく）
  { tag: 'path', region: 'star-1', group: 'anim-star-1', attrs: { d: starPath(492, 128, 46), 'stroke-width': 7 } },
  { tag: 'path', region: 'star-2', group: 'anim-star-2', attrs: { d: starPath(526, 322, 34), 'stroke-width': 7 } },
  { tag: 'path', region: 'star-3', group: 'anim-star-3', attrs: { d: starPath(92, 448, 40), 'stroke-width': 7 } },
  { tag: 'path', region: 'star-4', group: 'anim-star-4', attrs: { d: starPath(272, 246, 32), 'stroke-width': 7 } },
  { tag: 'path', region: 'star-5', group: 'anim-star-5', attrs: { d: starPath(466, 500, 30), 'stroke-width': 7 } },
  { tag: 'path', region: 'star-6', group: 'anim-star-6', attrs: { d: starPath(58, 96, 28), 'stroke-width': 7 } },
  // ながれぼし（本体＝領域、しっぽ＝デコ）
  { tag: 'path', region: 'shooting-star', group: 'anim-shoot', attrs: { d: starPath(150, 596, 34), 'stroke-width': 7 } },
  {
    tag: 'path',
    deco: true,
    group: 'anim-shoot',
    attrs: {
      d: 'M 178 570 L 246 512 M 190 596 L 278 540 M 176 618 L 232 584',
      fill: 'none',
      stroke: OUTLINE_COLOR,
      'stroke-width': 7,
      'stroke-linecap': 'round',
    },
  },
];

const twinkle = [1, 2, 3, 4, 5, 6]
  .map((i, idx) => {
    const dur = (1.6 + idx * 0.35).toFixed(2);
    const delay = (idx * 0.28).toFixed(2);
    return `.artwork.is-complete .anim-star-${i} { transform-box: fill-box; transform-origin: center; animation: moon-twinkle ${dur}s ease-in-out ${delay}s infinite; }`;
  })
  .join('\n');

const css = `
${twinkle}
@keyframes moon-twinkle {
  0%, 100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
  50% { transform: scale(1.28) rotate(14deg); filter: brightness(1.3); }
}
.artwork.is-complete .anim-moon-body { transform-box: fill-box; transform-origin: center; animation: moon-rock 5s ease-in-out infinite; }
@keyframes moon-rock { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
.artwork.is-complete .anim-shoot { animation: moon-shoot 5.4s linear infinite; }
@keyframes moon-shoot {
  0% { transform: translate(370px, -456px); opacity: 0; }
  6% { opacity: 1; }
  40% { opacity: 1; }
  48%, 100% { transform: translate(-210px, 184px); opacity: 0; }
}
.artwork.is-complete .anim-moon-cloud { animation: moon-cloud 10s ease-in-out infinite; }
@keyframes moon-cloud { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-46px); } }
`;

export const moon = buildPage({ id: 'moon', pieces, css });
