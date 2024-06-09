'use client'

import type { BlocksMap } from '@focus-reactive/cms-kit-sanity/sanity';
import { findBlockRoot } from '@focus-reactive/cms-kit-sanity/sanity-schema-type-utils';

import { PageBlock } from './PageBlock';
import pageBlock from './PageBlock/sa-schema';
import { pageBlockComponentsMap } from './PageBlock/sa-components';

// import { BlockTemplate } from './BlockTemplate';
// import blockTemplate from './BlockTemplate/sa-schema';

// Declare server component prop for nested renderSanityComponent function
// @ts-ignore
PageBlock.isServerComponent = true;

export const blocksMap: BlocksMap = {
  [findBlockRoot(pageBlock)]: PageBlock,
  // [findBlockRoot(blockTemplate)]: BlockTemplate,

  ...pageBlockComponentsMap,
};
