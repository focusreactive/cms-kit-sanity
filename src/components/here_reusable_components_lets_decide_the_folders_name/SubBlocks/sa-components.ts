import { findComponentRoot } from '@focus-reactive/cms-kit-sanity/sanity';
import type { BlocksMap } from '@focus-reactive/cms-kit-sanity/sanity';

import blogSection from '../ContentBlocks/BlogSection/sa-schema';
import { BlogSection } from '../ContentBlocks/BlogSection';
import grid from '../ContentBlocks/Grid/sa-schema';
import { Grid } from '../ContentBlocks/Grid';
import { StyledImage } from './StyledImage';
import styledImage from './StyledImage/sa-schema';
import { StyledRichText } from './StyledRichText';
import styledRichText from './StyledRichText/sa-schema';
import { FeaturePoints } from './FeaturePoints';
import featurePoints from './FeaturePoints/sa-schema';
import { LogoCloudGrid } from './LogoCloud';
import logoCloudGrid from './LogoCloud/sa-schema';
import { Buttons } from './Buttons';
import buttons from './Buttons/sa-schema';
import { Badges } from './Badges';
import badges from './Badges/sa-schema';

export const subBlocksMap: BlocksMap = {
  [findComponentRoot(grid)]: Grid,
  [findComponentRoot(styledImage)]: StyledImage,
  [findComponentRoot(styledRichText)]: StyledRichText,
  [findComponentRoot(featurePoints)]: FeaturePoints,
  [findComponentRoot(logoCloudGrid)]: LogoCloudGrid,
  [findComponentRoot(blogSection)]: BlogSection,
  [findComponentRoot(buttons)]: Buttons,
  [findComponentRoot(badges)]: Badges,
};
