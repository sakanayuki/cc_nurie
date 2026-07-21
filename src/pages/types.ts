/** 塗り絵1点分の定義。1点 = 1モジュールで追加・差し替えが完結する */
export interface ColoringPage {
  id: string;
  /** 塗りレイヤー（領域ごとに data-region を持つ）を含む完全な <svg> マークアップ */
  fillSvg: string;
  /** 輪郭線レイヤー（線画＋デコ）を含む完全な <svg> マークアップ */
  outlineSvg: string;
  /** 全領域 id。完成判定の分母 */
  regionIds: string[];
  /** 完成時に有効になるアニメーション CSS（.artwork.is-complete 配下のセレクタで書く） */
  completeCss: string;
}
