import { findBlockRoot } from '../../../sanity/model/typeGenerators';
import stats from './Stats/sa-schema';
import { Stats } from './Stats';
import type { BlocksMap } from '../../../types';

export const blocksMap: BlocksMap = {
  [findBlockRoot(stats)]: Stats,
};
