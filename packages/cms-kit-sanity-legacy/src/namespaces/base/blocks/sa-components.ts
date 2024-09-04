import { findBlockRoot } from '@/sanity/model/typeGenerators';
import type { BlocksMap } from '@/sanity/types';

import header from './Header/sa-schema';
import navHeader from './elements/NavHeader/sa-schema';
import newsLetter from './NewsLetter/sa-schema';
import testimonials from './Testimonials/sa-schema';
import { NewsLetter } from './NewsLetter';
import { Testimonials } from './Testimonials';
import { Header } from './Header';
import { NavHeader } from './elements/NavHeader';
import { PageBlock } from './PageBlock';
import pageBlock from './PageBlock/sa-schema';
import { pageBlockComponentsMap } from './PageBlock/sa-components';

// Declare server component prop for nested renderSanityComponent function
PageBlock.isServerComponent = true;

export const blocksMap: BlocksMap = {
  [findBlockRoot(navHeader)]: NavHeader,
  [findBlockRoot(header)]: Header,
  [findBlockRoot(newsLetter)]: NewsLetter,
  [findBlockRoot(testimonials)]: Testimonials,
  [findBlockRoot(pageBlock)]: PageBlock,

  ...pageBlockComponentsMap,
};
