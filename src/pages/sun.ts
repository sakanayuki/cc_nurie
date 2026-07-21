import { buildPage, OUTLINE_COLOR, type Piece } from './build';

// にじ: 中心 (300,790) の半円バンド5本
function band(ro: number, ri: number): string {
  return `M ${300 - ro} 790 A ${ro} ${ro} 0 0 1 ${300 + ro} 790 L ${300 + ri} 790 A ${ri} ${ri} 0 0 0 ${300 - ri} 790 Z`;
}

const rainbowBands: Piece[] = Array.from({ length: 5 }, (_, i) => {
  const ro = 284 - i * 25;
  return {
    tag: 'path',
    region: `rainbow-${i + 1}`,
    group: 'anim-rainbow',
    attrs: { d: band(ro, ro - 25), 'stroke-width': 7 },
  };
});

// たいようの光線: 8つの三角形（完成するとくるくる回る）
const rays: Piece[] = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4 + Math.PI / 8;
  const spread = 0.2;
  const p = (angle: number, r: number): string =>
    `${(300 + Math.cos(angle) * r).toFixed(1)} ${(290 + Math.sin(angle) * r).toFixed(1)}`;
  return {
    tag: 'path',
    region: `ray-${i + 1}`,
    group: 'anim-rays',
    attrs: { d: `M ${p(a - spread, 126)} L ${p(a, 200)} L ${p(a + spread, 126)} Z`, 'stroke-width': 7 },
  };
});

const cloudD =
  'M 20 726 Q 18 696 48 692 Q 56 668 88 672 Q 120 664 128 690 Q 152 696 148 718 Q 144 738 116 738 L 44 738 Q 22 738 20 726 Z';

function shiftPath(d: string, dx: number): string {
  // パスの x 座標だけを平行移動する（数値ペアの1つ目に dx を足す）
  return d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_m, x: string, y: string) => `${Number(x) + dx} ${y}`);
}

const pieces: Piece[] = [
  ...rainbowBands,
  ...rays,
  // たいよう本体＋かお（いっしょに脈打つ）
  { tag: 'circle', region: 'core', group: 'anim-core', attrs: { cx: 300, cy: 290, r: 112 } },
  { tag: 'circle', deco: true, group: 'anim-core', attrs: { cx: 262, cy: 272, r: 11, fill: OUTLINE_COLOR } },
  { tag: 'circle', deco: true, group: 'anim-core', attrs: { cx: 338, cy: 272, r: 11, fill: OUTLINE_COLOR } },
  {
    tag: 'path',
    deco: true,
    group: 'anim-core',
    attrs: { d: 'M 252 322 Q 300 362 348 322', fill: 'none', stroke: OUTLINE_COLOR, 'stroke-width': 9, 'stroke-linecap': 'round' },
  },
  // にじの両端のくも（デコ）
  {
    tag: 'path',
    deco: true,
    group: 'anim-cloud-left',
    attrs: { d: cloudD, fill: '#ffffff', stroke: OUTLINE_COLOR, 'stroke-width': 8, 'stroke-linejoin': 'round' },
  },
  {
    tag: 'path',
    deco: true,
    group: 'anim-cloud-right',
    attrs: { d: shiftPath(cloudD, 432), fill: '#ffffff', stroke: OUTLINE_COLOR, 'stroke-width': 8, 'stroke-linejoin': 'round' },
  },
];

const css = `
.artwork.is-complete .anim-rays { transform-box: view-box; transform-origin: 300px 290px; animation: sun-rays 12s linear infinite; }
@keyframes sun-rays { to { transform: rotate(360deg); } }
.artwork.is-complete .anim-core { transform-box: fill-box; transform-origin: center; animation: sun-core 2.4s ease-in-out infinite; }
@keyframes sun-core { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
.artwork.is-complete .anim-rainbow path { animation: sun-shimmer 2.4s ease-in-out infinite; }
.artwork.is-complete .anim-rainbow path:nth-child(2) { animation-delay: 0.2s; }
.artwork.is-complete .anim-rainbow path:nth-child(3) { animation-delay: 0.4s; }
.artwork.is-complete .anim-rainbow path:nth-child(4) { animation-delay: 0.6s; }
.artwork.is-complete .anim-rainbow path:nth-child(5) { animation-delay: 0.8s; }
@keyframes sun-shimmer { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.3); } }
.artwork.is-complete .anim-cloud-left,
.artwork.is-complete .anim-cloud-right { animation: sun-cloud 3.2s ease-in-out infinite; }
.artwork.is-complete .anim-cloud-right { animation-delay: 1.6s; }
@keyframes sun-cloud { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
`;

export const sun = buildPage({ id: 'sun', pieces, css });
