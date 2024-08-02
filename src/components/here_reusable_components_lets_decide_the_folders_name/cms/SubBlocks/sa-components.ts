import { findComponentRoot } from '@focus-reactive/cms-kit-sanity/sanity';
import type { BlocksMap } from '@focus-reactive/cms-kit-sanity/sanity';

import blogSection from '../ContentBlocks/BlogSection/sa-schema';
import { BlogSection } from '../../ui/BlogSection';
import grid from '../ContentBlocks/Grid/sa-schema';
import { Grid } from '../../ui/Grid';
import { StyledImage } from '../../ui/StyledImage';
import styledImage from './StyledImage/sa-schema';
import { StyledRichText } from '../../ui/StyledRichText';
import styledRichText from './StyledRichText/sa-schema';
import { FeaturePoints } from '../../ui/FeaturePoints';
import featurePoints from './FeaturePoints/sa-schema';
import { LogoCloudGrid } from '../../ui/LogoCloud';
import logoCloudGrid from './LogoCloud/sa-schema';
import { Buttons } from '../../ui/Buttons';
import buttons from './Buttons/sa-schema';
import { Badges } from '../../ui/Badges';
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
