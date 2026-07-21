import type { Paint } from './magic';

export type Op =
  | { type: 'fill'; regionId: string; prev: Paint | null; next: Paint }
  | { type: 'stroke'; before: string };

const MAX = 30;

export class History {
  private stack: Op[] = [];

  push(op: Op): void {
    if (this.stack.length >= MAX) this.stack.shift();
    this.stack.push(op);
  }

  pop(): Op | undefined {
    return this.stack.pop();
  }

  clear(): void {
    this.stack = [];
  }
}
