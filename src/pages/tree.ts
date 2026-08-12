import { buildPage, cloudPath, OUTLINE_COLOR, sunRaysPath, type Piece } from './build';

const pieces: Piece[] = [
  // たいよう
  { tag: 'circle', region: 'sun', group: 'anim-tree-sun', attrs: { cx: 508, cy: 102, r: 52 } },
  {
    tag: 'path',
    deco: true,
    group: 'anim-tree-sun',
    attrs: { d: sunRaysPath(508, 102, 66, 90), fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 7, 'stroke-linecap': 'round' },
  },
  // くも
  { tag: 'path', region: 'cloud', group: 'anim-tree-cloud', attrs: { d: cloudPath(126, 120, 78), 'stroke-width': 8 } },
  // じめん・みき
  {
    tag: 'path',
    region: 'grass',
    attrs: { d: 'M -20 676 Q 150 640 300 668 Q 450 696 620 660 L 620 812 L -20 812 Z', 'stroke-width': 8 },
  },
  { tag: 'path', region: 'trunk', attrs: { d: 'M 268 420 L 248 684 L 352 684 L 332 420 Z' } },
  // はっぱ（3つのかたまり・すきまなく重ねてみきの根元を隠す）＋ 木になったままのりんご
  { tag: 'circle', region: 'leaf-top', group: 'anim-canopy', attrs: { cx: 300, cy: 250, r: 138 } },
  { tag: 'circle', region: 'leaf-left', group: 'anim-canopy', attrs: { cx: 196, cy: 372, r: 120 } },
  { tag: 'circle', region: 'leaf-right', group: 'anim-canopy', attrs: { cx: 404, cy: 372, r: 120 } },
  { tag: 'circle', region: 'apple-1', group: 'anim-canopy', attrs: { cx: 216, cy: 262, r: 34, 'stroke-width': 7 } },
  { tag: 'circle', region: 'apple-2', group: 'anim-canopy', attrs: { cx: 384, cy: 258, r: 34, 'stroke-width': 7 } },
  { tag: 'circle', region: 'apple-3', group: 'anim-canopy', attrs: { cx: 300, cy: 166, r: 34, 'stroke-width': 7 } },
  { tag: 'circle', region: 'apple-4', group: 'anim-canopy', attrs: { cx: 150, cy: 392, r: 34, 'stroke-width': 7 } },
  { tag: 'circle', region: 'apple-5', group: 'anim-canopy', attrs: { cx: 450, cy: 392, r: 34, 'stroke-width': 7 } },
  // おちるりんご
  { tag: 'circle', region: 'apple-6', group: 'anim-apple-fall', attrs: { cx: 300, cy: 250, r: 36, 'stroke-width': 7 } },
];

const css = `
.artwork.is-complete .anim-canopy { transform-box: view-box; transform-origin: 300px 440px; animation: tree-sway 3.4s ease-in-out infinite; }
@keyframes tree-sway { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
.artwork.is-complete .anim-apple-fall { transform-box: fill-box; transform-origin: center; animation: tree-apple 3.6s ease-in infinite; }
@keyframes tree-apple {
  0%, 30% { transform: translate(0, 0) rotate(0deg); }
  70% { transform: translate(-20px, 380px) rotate(170deg); }
  80% { transform: translate(-26px, 344px) rotate(200deg); }
  92% { transform: translate(-32px, 380px) rotate(220deg); opacity: 1; }
  100% { transform: translate(-32px, 380px) rotate(220deg); opacity: 0; }
}
.artwork.is-complete .anim-tree-cloud { animation: tree-cloud 9s ease-in-out infinite; }
@keyframes tree-cloud { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(42px); } }
.artwork.is-complete .anim-tree-sun { transform-box: fill-box; transform-origin: center; animation: tree-sun 12s linear infinite; }
@keyframes tree-sun { to { transform: rotate(360deg); } }
`;

export const tree = buildPage({ id: 'tree', pieces, css });
