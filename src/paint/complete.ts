export function isComplete(regions: Record<string, unknown>, regionIds: string[]): boolean {
  return regionIds.every((id) => regions[id] != null);
}

const CONFETTI_COLORS = ['#e94b35', '#f6871f', '#fdd835', '#8bc34a', '#4fc3f7', '#8e5bc7', '#f48fb1'];

/** 完成の瞬間の紙吹雪 */
export function celebrate(): void {
  const box = document.createElement('div');
  box.className = 'confetti';
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('i');
    p.style.setProperty('--x', `${(Math.random() * 100).toFixed(1)}%`);
    p.style.setProperty('--c', CONFETTI_COLORS[i % CONFETTI_COLORS.length]);
    p.style.setProperty('--t', `${(1.6 + Math.random() * 1.4).toFixed(2)}s`);
    p.style.setProperty('--d', `${(Math.random() * 0.7).toFixed(2)}s`);
    p.style.setProperty('--r', `${Math.floor(Math.random() * 720 - 360)}deg`);
    box.append(p);
  }
  document.body.append(box);
  setTimeout(() => box.remove(), 3600);
}
