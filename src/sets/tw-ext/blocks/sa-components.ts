import type { BlocksMap } from '@focus-reactive/cms-kit-sanity/sanity';
import { findBlockRoot } from '@focus-reactive/cms-kit-sanity/sanity-schema-type-utils';

import stats from './Stats/sa-schema';
import { Stats } from './Stats';

export const blocksMap: BlocksMap = {
  [findBlockRoot(stats)]: Stats,
};
