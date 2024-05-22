import type { BlocksMap } from '@focus-reactive/cms-kit-sanity/sanity';
import { findBlockRoot } from '@focus-reactive/cms-kit-sanity/sanity-schema-type-utils';

import { LandingBlock } from './LandingBlock';
import landingBlock from './LandingBlock/sa-schema';
// import { pageBlockComponentsMap } from './LandingBlock/sa-components';


export const blocksMap: BlocksMap = {
  [findBlockRoot(landingBlock)]: LandingBlock,

  // ...pageBlockComponentsMap,
};
