import { findComponentRoot } from '@/sanity/model/typeGenerators';
import type { BlocksMap } from '@/sanity/types';

import blogSection from './components/BlogSection/sa-schema';
import { BlogSection } from './components/BlogSection';
import { Grid } from './components/Grid';
import grid from './components/Grid/sa-schema';
import { StyledImage } from './components/StyledImage';
import styledImage from './components/StyledImage/sa-schema';
import { StyledRichText } from './components/StyledRichText';
import styledRichText from './components/StyledRichText/sa-schema';
import { FeaturePoints } from './components/FeaturePoints';
import featurePoints from './components/FeaturePoints/sa-schema';
import { LogoCloudGrid } from './components/LogoCloud';
import logoCloudGrid from './components/LogoCloud/sa-schema';
import { Buttons } from './components/Buttons';
import buttons from './components/Buttons/sa-schema';
import { Badges } from './components/Badges';
import badges from './components/Badges/sa-schema';

export const pageBlockComponentsMap: BlocksMap = {
  [findComponentRoot(grid)]: Grid,
  [findComponentRoot(styledImage)]: StyledImage,
  [findComponentRoot(styledRichText)]: StyledRichText,
  [findComponentRoot(featurePoints)]: FeaturePoints,
  [findComponentRoot(logoCloudGrid)]: LogoCloudGrid,
  [findComponentRoot(blogSection)]: BlogSection,
  [findComponentRoot(buttons)]: Buttons,
  [findComponentRoot(badges)]: Badges,
};
