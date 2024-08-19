import { findComponentRoot } from '@focus-reactive/cms-kit-sanity/sanity';
import type { BlocksMap } from '@focus-reactive/cms-kit-sanity/sanity';

import blogSection from '../root-blocks/BlogSection/sa-schema';
import { BlogSection } from '../../../ui-layer/BlogSection';
import grid from '../root-blocks/Grid/sa-schema';
import { Grid } from '../../../ui-layer/Grid';
import { StyledImage } from '../../../ui-layer/StyledImage';
import styledImage from './StyledImage/sa-schema';
import { StyledRichText } from '../../../ui-layer/StyledRichText';
import styledRichText from './StyledRichText/sa-schema';
import { FeaturePoints } from '../../../ui-layer/FeaturePoints';
import featurePoints from './FeaturePoints/sa-schema';
import { LogoCloudGrid } from '../../../ui-layer/LogoCloud';
import logoCloudGrid from './LogoCloud/sa-schema';
import { Buttons } from '../../../ui-layer/Buttons';
import buttons from './Buttons/sa-schema';
import { Badges } from '../../../ui-layer/Badges';
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
