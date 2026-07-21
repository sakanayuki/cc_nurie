import type { Paint } from './magic';

const W = 600;
const H = 800;
const LINE_WIDTH = 15;

export interface CrayonApi {
  clear(): void;
  loadFrom(dataUrl: string | null): void;
}

interface CrayonOptions {
  getPaint: () => Paint;
  onStrokeStart: (before: string) => void;
  onStrokeEnd: (after: string) => void;
}

/** クレヨン自由描画。にじいろは色相が流れ、キラキラは金色＋星が散る */
export function setupCrayon(canvas: HTMLCanvasElement, opts: CrayonOptions): CrayonApi {
  const ctx = canvas.getContext('2d');
  if (!ctx) return { clear: () => {}, loadFrom: () => {} };
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = LINE_WIDTH;

  let drawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let sparkleDist = 0;

  const toLocal = (e: PointerEvent): [number, number] => {
    const r = canvas.getBoundingClientRect();
    return [((e.clientX - r.left) * W) / r.width, ((e.clientY - r.top) * H) / r.height];
  };

  const strokeStyleFor = (paint: Paint): string => {
    if (paint === 'rainbow') return `hsl(${hue.toFixed(0)}, 90%, 60%)`;
    if (paint === 'sparkle') return '#ffd94a';
    return paint;
  };

  canvas.addEventListener('pointerdown', (e) => {
    if (!e.isPrimary) return;
    canvas.setPointerCapture(e.pointerId);
    drawing = true;
    opts.onStrokeStart(canvas.toDataURL());
    [lastX, lastY] = toLocal(e);
    ctx.strokeStyle = strokeStyleFor(opts.getPaint());
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(lastX + 0.1, lastY + 0.1); // タップだけでも点が付く
    ctx.stroke();
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!drawing || !e.isPrimary) return;
    const [x, y] = toLocal(e);
    const dist = Math.hypot(x - lastX, y - lastY);
    const paint = opts.getPaint();
    if (paint === 'rainbow') hue = (hue + dist * 0.8) % 360;
    ctx.strokeStyle = strokeStyleFor(paint);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (paint === 'sparkle') {
      sparkleDist += dist;
      while (sparkleDist > 34) {
        sparkleDist -= 34;
        drawStar(ctx, x + jitter(20), y + jitter(20));
      }
    }
    lastX = x;
    lastY = y;
  });

  const end = (e: PointerEvent): void => {
    if (!drawing || !e.isPrimary) return;
    drawing = false;
    opts.onStrokeEnd(canvas.toDataURL());
  };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);

  return {
    clear() {
      ctx.clearRect(0, 0, W, H);
    },
    loadFrom(dataUrl) {
      if (!dataUrl) {
        ctx.clearRect(0, 0, W, H);
        return;
      }
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(img, 0, 0, W, H);
      };
      img.src = dataUrl;
    },
  };
}

function jitter(range: number): number {
  return (Math.random() - 0.5) * 2 * range;
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  const s = 4 + Math.random() * 4;
  ctx.save();
  ctx.fillStyle = '#fffbe8';
  ctx.beginPath();
  ctx.moveTo(x, y - 2 * s);
  ctx.lineTo(x + 0.6 * s, y - 0.6 * s);
  ctx.lineTo(x + 2 * s, y);
  ctx.lineTo(x + 0.6 * s, y + 0.6 * s);
  ctx.lineTo(x, y + 2 * s);
  ctx.lineTo(x - 0.6 * s, y + 0.6 * s);
  ctx.lineTo(x - 2 * s, y);
  ctx.lineTo(x - 0.6 * s, y - 0.6 * s);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
