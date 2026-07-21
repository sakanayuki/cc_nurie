import type { ColoringPage } from './types';
import { fish } from './fish';
import { cat } from './cat';
import { car } from './car';
import { rocket } from './rocket';
import { flower } from './flower';
import { sun } from './sun';

export const PAGES: ColoringPage[] = [fish, cat, car, rocket, flower, sun];

export function getPage(id: string): ColoringPage | undefined {
  return PAGES.find((p) => p.id === id);
}
