import { findBlockRoot } from '@focus-reactive/cms-kit-sanity/sanity-schema-type-utils';
import type { BlocksMap } from '@focus-reactive/cms-kit-sanity/sanity';

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
  [findBlockRoot(grid)]: Grid,
  [findBlockRoot(styledImage)]: StyledImage,
  [findBlockRoot(styledRichText)]: StyledRichText,
  [findBlockRoot(featurePoints)]: FeaturePoints,
  [findBlockRoot(logoCloudGrid)]: LogoCloudGrid,
  [findBlockRoot(blogSection)]: BlogSection,
  [findBlockRoot(buttons)]: Buttons,
  [findBlockRoot(badges)]: Badges,
};
