import { buildPage, OUTLINE_COLOR, sunRaysPath, type Piece } from './build';

function spokes(cx: number, cy: number): string {
  return sunRaysPath(cx, cy, 0, 46, 4);
}

/** タイヤ1つ分（本体＝領域、ハブとスポーク＝デコ）をまとめて返す */
function wheel(id: string, cx: number, cy: number): Piece[] {
  const group = `anim-${id}`;
  return [
    { tag: 'circle', region: id, group, attrs: { cx, cy, r: 58 } },
    { tag: 'circle', deco: true, group, attrs: { cx, cy, r: 24, fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 7 } },
    {
      tag: 'path',
      deco: true,
      group,
      attrs: { d: spokes(cx, cy), fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 6, 'stroke-linecap': 'round' },
    },
  ];
}

const pieces: Piece[] = [
  // けむり（えんとつから上へ）
  { tag: 'circle', region: 'smoke1', group: 'anim-smoke1', attrs: { cx: 196, cy: 248, r: 44 } },
  { tag: 'circle', region: 'smoke2', group: 'anim-smoke2', attrs: { cx: 274, cy: 152, r: 36, 'stroke-width': 7 } },
  { tag: 'circle', region: 'smoke3', group: 'anim-smoke3', attrs: { cx: 356, cy: 74, r: 28, 'stroke-width': 7 } },
  // せんろ（デコ・完成するとながれる）
  {
    tag: 'path',
    deco: true,
    group: 'anim-rail',
    attrs: {
      d: 'M -80 700 L 680 700 M -60 730 L -60 762 M 20 730 L 20 762 M 100 730 L 100 762 M 180 730 L 180 762 M 260 730 L 260 762 M 340 730 L 340 762 M 420 730 L 420 762 M 500 730 L 500 762 M 580 730 L 580 762 M 660 730 L 660 762',
      fill: 'none',
      stroke: OUTLINE_COLOR,
      'stroke-width': 9,
      'stroke-linecap': 'round',
    },
  },
  // しゃたい（えんとつ→ライト→ボイラー→やね→うんてんだい→まど）
  { tag: 'path', region: 'chimney', group: 'anim-loco', attrs: { d: 'M 148 404 L 166 314 L 224 314 L 242 404 Z' } },
  { tag: 'circle', region: 'lamp', group: 'anim-loco', attrs: { cx: 94, cy: 378, r: 36, 'stroke-width': 7 } },
  {
    tag: 'path',
    region: 'boiler',
    group: 'anim-loco',
    attrs: { d: 'M 66 402 L 372 402 L 372 604 L 66 604 Q 52 604 52 590 L 52 416 Q 52 402 66 402 Z' },
  },
  { tag: 'path', region: 'cab-roof', group: 'anim-loco', attrs: { d: 'M 344 256 L 550 256 L 550 300 L 344 300 Z' } },
  { tag: 'path', region: 'cab', group: 'anim-loco', attrs: { d: 'M 372 300 L 520 300 L 520 604 L 372 604 Z' } },
  { tag: 'rect', region: 'window', group: 'anim-loco', attrs: { x: 396, y: 330, width: 100, height: 94, rx: 14, 'stroke-width': 7 } },
  // しゃりん ×3
  ...wheel('wheel-1', 130, 640),
  ...wheel('wheel-2', 290, 640),
  ...wheel('wheel-3', 450, 640),
];

const css = `
.artwork.is-complete .layers { animation: train-run 1.4s ease-in-out infinite; }
@keyframes train-run { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(10px); } }
.artwork.is-complete .anim-loco { animation: train-bounce 0.5s ease-in-out infinite alternate; }
@keyframes train-bounce { from { transform: translateY(0); } to { transform: translateY(-6px); } }
.artwork.is-complete .anim-wheel-1,
.artwork.is-complete .anim-wheel-2,
.artwork.is-complete .anim-wheel-3 { transform-box: fill-box; transform-origin: center; animation: train-wheel 1s linear infinite; }
@keyframes train-wheel { to { transform: rotate(360deg); } }
.artwork.is-complete .anim-rail { animation: train-rail 0.6s linear infinite; }
@keyframes train-rail { to { transform: translateX(-80px); } }
.artwork.is-complete .anim-smoke1 { animation: train-smoke 2.6s ease-out infinite; }
.artwork.is-complete .anim-smoke2 { animation: train-smoke 2.6s ease-out 0.55s infinite; }
.artwork.is-complete .anim-smoke3 { animation: train-smoke 2.6s ease-out 1.1s infinite; }
@keyframes train-smoke {
  0% { transform: translate(-52px, 96px) scale(0.4); opacity: 0; }
  20% { opacity: 1; }
  70% { opacity: 1; }
  100% { transform: translate(60px, -78px) scale(1.25); opacity: 0; }
}
`;

export const train = buildPage({ id: 'train', pieces, css });
