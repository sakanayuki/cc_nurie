import { buildPage, OUTLINE_COLOR, type Piece } from './build';

const pieces: Piece[] = [
  // しっぽ（からだのうしろ）
  {
    tag: 'path',
    region: 'tail',
    group: 'anim-tail',
    attrs: { d: 'M 410 655 C 545 655 575 535 545 455 C 533 424 490 432 497 468 C 512 535 480 610 402 612 Z' },
  },
  // みみ
  { tag: 'path', region: 'ear-left', attrs: { d: 'M 172 178 L 220 58 L 276 148 Z' } },
  { tag: 'path', region: 'ear-right', attrs: { d: 'M 428 178 L 380 58 L 324 148 Z' } },
  { tag: 'path', region: 'inner-ear-left', attrs: { d: 'M 200 152 L 226 90 L 254 138 Z', 'stroke-width': 6 } },
  { tag: 'path', region: 'inner-ear-right', attrs: { d: 'M 400 152 L 374 90 L 346 138 Z', 'stroke-width': 6 } },
  // あたま・からだ・おなか・まえあし
  { tag: 'circle', region: 'head', attrs: { cx: 300, cy: 260, r: 148 } },
  { tag: 'ellipse', region: 'body', attrs: { cx: 300, cy: 580, rx: 150, ry: 175 } },
  { tag: 'ellipse', region: 'tummy', attrs: { cx: 300, cy: 615, rx: 80, ry: 78, 'stroke-width': 6 } },
  { tag: 'ellipse', region: 'paw-left', attrs: { cx: 230, cy: 725, rx: 48, ry: 27, 'stroke-width': 7 } },
  { tag: 'ellipse', region: 'paw-right', attrs: { cx: 370, cy: 725, rx: 48, ry: 27, 'stroke-width': 7 } },
  // けいと
  { tag: 'circle', region: 'yarn', group: 'anim-yarn', attrs: { cx: 118, cy: 700, r: 55 } },
  {
    tag: 'path',
    deco: true,
    group: 'anim-yarn',
    attrs: {
      d: 'M 75 665 Q 118 690 160 668 M 68 705 Q 118 728 168 703 M 82 738 Q 118 758 155 736',
      fill: 'none',
      stroke: OUTLINE_COLOR,
      'stroke-width': 5,
      'stroke-linecap': 'round',
    },
  },
  // ハート
  {
    tag: 'path',
    region: 'heart',
    group: 'anim-heart',
    attrs: { d: 'M 487 195 C 442 152 460 100 487 122 C 514 100 532 152 487 195 Z', 'stroke-width': 7 },
  },
  // かお（デコ）
  { tag: 'ellipse', deco: true, group: 'anim-eyes', attrs: { cx: 252, cy: 240, rx: 13, ry: 17, fill: OUTLINE_COLOR } },
  { tag: 'ellipse', deco: true, group: 'anim-eyes', attrs: { cx: 348, cy: 240, rx: 13, ry: 17, fill: OUTLINE_COLOR } },
  { tag: 'path', deco: true, attrs: { d: 'M 288 276 L 312 276 L 300 293 Z', fill: OUTLINE_COLOR } },
  {
    tag: 'path',
    deco: true,
    attrs: {
      d: 'M 300 293 Q 285 316 264 306 M 300 293 Q 315 316 336 306',
      fill: 'none',
      stroke: OUTLINE_COLOR,
      'stroke-width': 7,
      'stroke-linecap': 'round',
    },
  },
  // ひげ
  {
    tag: 'path',
    deco: true,
    attrs: {
      d: 'M 172 262 L 96 250 M 174 285 L 98 292 M 428 262 L 504 250 M 426 285 L 502 292',
      fill: 'none',
      stroke: OUTLINE_COLOR,
      'stroke-width': 6,
      'stroke-linecap': 'round',
    },
  },
];

const css = `
.artwork.is-complete .layers { animation: cat-bob 2.6s ease-in-out infinite; }
@keyframes cat-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.artwork.is-complete .anim-tail { transform-box: fill-box; transform-origin: 5% 95%; animation: cat-tail 1s ease-in-out infinite alternate; }
@keyframes cat-tail { from { transform: rotate(-8deg); } to { transform: rotate(14deg); } }
.artwork.is-complete .anim-eyes { transform-box: fill-box; transform-origin: center; animation: cat-blink 3.2s infinite; }
@keyframes cat-blink { 0%, 90%, 100% { transform: scaleY(1); } 94% { transform: scaleY(0.1); } }
.artwork.is-complete .anim-heart { transform-box: fill-box; transform-origin: center; animation: cat-heart 1.6s ease-in-out infinite; }
@keyframes cat-heart { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-14px) scale(1.15); } }
.artwork.is-complete .anim-yarn { transform-box: fill-box; transform-origin: center; animation: cat-yarn 2.2s ease-in-out infinite; }
@keyframes cat-yarn { 0%, 100% { transform: rotate(-6deg); } 50% { transform: rotate(8deg); } }
`;

export const cat = buildPage({ id: 'cat', pieces, css });
