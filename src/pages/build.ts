import { MAGIC_DEFS } from '../paint/magic';
import type { ColoringPage } from './types';

export const VIEW_W = 600;
export const VIEW_H = 800;

export const OUTLINE_COLOR = '#3f3a36';

/**
 * 線画を構成する1パーツ。
 * - region あり: 塗りレイヤー（白塗り・タップ可）と輪郭線レイヤーの両方に出る
 * - deco: 輪郭線レイヤーのみに出る飾り（目・ひげ・道路など。attrs で自前スタイル指定）
 * - group: 連続する同名パーツを <g class="..."> で包む（完成アニメの適用単位。両レイヤーで一致する）
 */
export interface Piece {
  tag: string;
  attrs: Record<string, string | number>;
  region?: string;
  deco?: boolean;
  group?: string;
}

function el(tag: string, attrs: Record<string, string | number>): string {
  const a = Object.entries(attrs)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');
  return `<${tag} ${a}/>`;
}

function renderLayer(pieces: Piece[], layer: 'fill' | 'outline', stroke: number): string {
  const parts: string[] = [];
  let openGroup: string | null = null;
  const closeGroup = (): void => {
    if (openGroup) {
      parts.push('</g>');
      openGroup = null;
    }
  };
  for (const p of pieces) {
    if (layer === 'fill' && !p.region) continue;
    const group = p.group ?? null;
    if (group !== openGroup) {
      closeGroup();
      if (group) {
        parts.push(`<g class="${group}">`);
        openGroup = group;
      }
    }
    if (p.region) {
      const attrs =
        layer === 'fill'
          ? { ...p.attrs, fill: '#ffffff', 'data-region': p.region, class: 'region' }
          : {
              fill: 'none',
              stroke: OUTLINE_COLOR,
              'stroke-width': stroke,
              'stroke-linejoin': 'round',
              'stroke-linecap': 'round',
              ...p.attrs,
            };
      parts.push(el(p.tag, attrs));
    } else {
      parts.push(el(p.tag, p.attrs));
    }
  }
  closeGroup();
  return parts.join('');
}

export function buildPage(opts: {
  id: string;
  pieces: Piece[];
  css: string;
  stroke?: number;
}): ColoringPage {
  const stroke = opts.stroke ?? 9;
  const vb = `viewBox="0 0 ${VIEW_W} ${VIEW_H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"`;
  return {
    id: opts.id,
    regionIds: opts.pieces.filter((p) => p.region).map((p) => p.region as string),
    fillSvg: `<svg class="layer fill-layer" ${vb}>${MAGIC_DEFS}${renderLayer(opts.pieces, 'fill', stroke)}</svg>`,
    outlineSvg: `<svg class="layer outline-layer" ${vb} aria-hidden="true">${renderLayer(opts.pieces, 'outline', stroke)}</svg>`,
    completeCss: opts.css,
  };
}

/** 回転した楕円をパスとして返す（transform 属性を使わないので poyon 演出と干渉しない） */
export function rotatedEllipsePath(cx: number, cy: number, rx: number, ry: number, deg: number): string {
  const rad = (deg * Math.PI) / 180;
  const dx = rx * Math.cos(rad);
  const dy = rx * Math.sin(rad);
  const x1 = (cx - dx).toFixed(1);
  const y1 = (cy - dy).toFixed(1);
  const x2 = (cx + dx).toFixed(1);
  const y2 = (cy + dy).toFixed(1);
  return `M ${x1} ${y1} A ${rx} ${ry} ${deg} 0 1 ${x2} ${y2} A ${rx} ${ry} ${deg} 0 1 ${x1} ${y1} Z`;
}

/** 5角の星パス */
export function starPath(cx: number, cy: number, outer: number, inner = outer * 0.45): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M ${pts.join(' L ')} Z`;
}

/** 太陽の光線（短い放射線）のパス */
export function sunRaysPath(cx: number, cy: number, r1: number, r2: number, count = 8): string {
  return Array.from({ length: count }, (_, i) => {
    const a = (i * 2 * Math.PI) / count;
    const x1 = (cx + Math.cos(a) * r1).toFixed(1);
    const y1 = (cy + Math.sin(a) * r1).toFixed(1);
    const x2 = (cx + Math.cos(a) * r2).toFixed(1);
    const y2 = (cy + Math.sin(a) * r2).toFixed(1);
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }).join(' ');
}
