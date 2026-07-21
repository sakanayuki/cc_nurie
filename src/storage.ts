/** 領域の塗り値: CSS カラー or 'rainbow' | 'sparkle' */
export type RegionPaint = string;

export interface SavedState {
  version: 1;
  regions: Record<string, RegionPaint>;
  crayon: string | null;
  completed: boolean;
}

const key = (pageId: string): string => `nurie:v1:${pageId}`;

const emptyState = (): SavedState => ({
  version: 1,
  regions: {},
  crayon: null,
  completed: false,
});

// 保存まわりの失敗は握りつぶしてまっさらから始める（子どもの前でエラー画面を出さない）
export function loadState(pageId: string): SavedState {
  try {
    const raw = localStorage.getItem(key(pageId));
    if (!raw) return emptyState();
    const data = JSON.parse(raw) as Partial<SavedState>;
    if (data && data.version === 1 && typeof data.regions === 'object' && data.regions) {
      return {
        version: 1,
        regions: data.regions,
        crayon: typeof data.crayon === 'string' ? data.crayon : null,
        completed: data.completed === true,
      };
    }
  } catch {
    /* noop */
  }
  return emptyState();
}

export function saveState(pageId: string, state: SavedState): void {
  try {
    localStorage.setItem(key(pageId), JSON.stringify(state));
  } catch {
    /* noop */
  }
}

export function clearState(pageId: string): void {
  try {
    localStorage.removeItem(key(pageId));
  } catch {
    /* noop */
  }
}
