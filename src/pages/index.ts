import type { ColoringPage } from './types';
import { fish } from './fish';
import { cat } from './cat';
import { bird } from './bird';
import { elephant } from './elephant';
import { car } from './car';
import { rocket } from './rocket';
import { train } from './train';
import { ship } from './ship';
import { flower } from './flower';
import { sun } from './sun';
import { tree } from './tree';
import { moon } from './moon';

// 並びは固定（どうぶつ → のりもの → しぜん）。子どもが位置で自分の絵を覚えるため入れ替えない
export const PAGES: ColoringPage[] = [
  fish,
  cat,
  bird,
  elephant,
  car,
  rocket,
  train,
  ship,
  flower,
  sun,
  tree,
  moon,
];

export function getPage(id: string): ColoringPage | undefined {
  return PAGES.find((p) => p.id === id);
}
