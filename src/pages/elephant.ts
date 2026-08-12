import { buildPage, OUTLINE_COLOR, rotatedEllipsePath, type Piece } from './build';

const pieces: Piece[] = [
  // みずたまり（いちばん奥。あしはこの上に立つ）
  { tag: 'ellipse', region: 'puddle', group: 'anim-puddle', attrs: { cx: 300, cy: 786, rx: 210, ry: 24, 'stroke-width': 8 } },
  // みみ（あたまのうしろ・ぱたぱた）
  { tag: 'path', region: 'ear-left', group: 'anim-ear-left', attrs: { d: rotatedEllipsePath(120, 264, 76, 92, -12) } },
  { tag: 'path', region: 'ear-right', group: 'anim-ear-right', attrs: { d: rotatedEllipsePath(480, 264, 76, 92, 12) } },
  // からだ・あし・しっぽ
  { tag: 'ellipse', region: 'body', attrs: { cx: 300, cy: 520, rx: 168, ry: 116 } },
  // あし・しっぽの付け根は、からだの楕円と同じ弧で閉じるので継ぎ目が見えない
  {
    tag: 'path',
    region: 'leg-left',
    attrs: { d: 'M 164 588 L 164 722 Q 164 750 200 750 Q 236 750 236 722 L 236 627 A 168 116 0 0 1 164 588 Z' },
  },
  {
    tag: 'path',
    region: 'leg-right',
    attrs: { d: 'M 364 627 L 364 722 Q 364 750 400 750 Q 436 750 436 722 L 436 588 A 168 116 0 0 1 364 627 Z' },
  },
  {
    tag: 'path',
    region: 'tail',
    group: 'anim-tail',
    attrs: {
      d: 'M 466 504 Q 540 530 536 590 Q 534 626 502 626 Q 478 624 486 604 Q 496 566 456 563 A 168 116 0 0 0 466 504 Z',
      'stroke-width': 7,
    },
  },
  // あたま・はな（はなの付け根はあたまの輪郭と同じ弧なので継ぎ目が見えない）
  { tag: 'circle', region: 'head', attrs: { cx: 300, cy: 272, r: 138 } },
  {
    tag: 'path',
    region: 'trunk',
    group: 'anim-trunk',
    attrs: {
      d: 'M 252 401 C 242 476 248 560 264 640 Q 270 664 300 664 Q 330 664 336 640 C 352 560 358 476 348 401 A 138 138 0 0 1 252 401 Z',
    },
  },
  // はなさきから おちる みず
  { tag: 'circle', region: 'drop-1', group: 'anim-drop-1', attrs: { cx: 300, cy: 700, r: 26, 'stroke-width': 7 } },
  { tag: 'circle', region: 'drop-2', group: 'anim-drop-2', attrs: { cx: 300, cy: 754, r: 20, 'stroke-width': 7 } },
  // め（デコ）
  { tag: 'circle', deco: true, group: 'anim-eyes', attrs: { cx: 252, cy: 256, r: 16, fill: OUTLINE_COLOR } },
  { tag: 'circle', deco: true, group: 'anim-eyes', attrs: { cx: 348, cy: 256, r: 16, fill: OUTLINE_COLOR } },
  { tag: 'circle', deco: true, group: 'anim-eyes', attrs: { cx: 258, cy: 249, r: 5, fill: '#ffffff' } },
  { tag: 'circle', deco: true, group: 'anim-eyes', attrs: { cx: 354, cy: 249, r: 5, fill: '#ffffff' } },
];

const css = `
.artwork.is-complete .layers { animation: eleph-walk 2.8s ease-in-out infinite; }
@keyframes eleph-walk { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
.artwork.is-complete .anim-trunk { transform-box: fill-box; transform-origin: 50% 0%; animation: eleph-trunk 1.8s ease-in-out infinite alternate; }
@keyframes eleph-trunk { from { transform: rotate(-7deg); } to { transform: rotate(7deg); } }
.artwork.is-complete .anim-ear-left { transform-box: fill-box; transform-origin: 100% 50%; animation: eleph-ear-l 0.9s ease-in-out infinite alternate; }
.artwork.is-complete .anim-ear-right { transform-box: fill-box; transform-origin: 0% 50%; animation: eleph-ear-r 0.9s ease-in-out infinite alternate; }
@keyframes eleph-ear-l { from { transform: rotate(6deg); } to { transform: rotate(-13deg); } }
@keyframes eleph-ear-r { from { transform: rotate(-6deg); } to { transform: rotate(13deg); } }
.artwork.is-complete .anim-tail { transform-box: fill-box; transform-origin: 0% 0%; animation: eleph-tail 1.3s ease-in-out infinite alternate; }
@keyframes eleph-tail { from { transform: rotate(-10deg); } to { transform: rotate(10deg); } }
.artwork.is-complete .anim-drop-1 { animation: eleph-drop 1.8s ease-in infinite; }
.artwork.is-complete .anim-drop-2 { animation: eleph-drop 1.8s ease-in 0.9s infinite; }
@keyframes eleph-drop {
  0% { transform: translateY(-46px) scale(0.5); opacity: 0; }
  25%, 80% { opacity: 1; }
  100% { transform: translateY(94px) scale(1.05); opacity: 0; }
}
.artwork.is-complete .anim-puddle { transform-box: fill-box; transform-origin: center; animation: eleph-puddle 1.8s ease-in-out infinite; }
@keyframes eleph-puddle { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(1.05); } }
`;

export const elephant = buildPage({ id: 'elephant', pieces, css });
