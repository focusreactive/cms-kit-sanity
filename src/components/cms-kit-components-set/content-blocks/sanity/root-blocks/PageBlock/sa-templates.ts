import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';

import categoryPreviewJSON from './templates/sa-mock-category-preview.json';
import featureGrid2x2 from './templates/sa-mock-feature-grid-2x2.json';
import featureGrid2x2Screenshot from './templates/sa-mock-feature-grid-2x2.png';
import featureWithImageLeft from './templates/sa-mock-feature-with-image-left.json';
import featureWithScreenshot  from './templates/sa-mock-feature-with-image-left.png';
import featureWithImageRight from './templates/sa-mock-feature-with-image-right.json';
import featureWithLargeImageLight from './templates/sa-mock-feature-with-large-image-light.json';
import featureWithLargeImageLightScreenshot from './templates/sa-mock-feature-with-large-image-light.png';
import featureWithLargeImageDark from './templates/sa-mock-feature-with-large-image-dark.json';
import featureWithLargeImageDarkScreenshot from './templates/sa-mock-feature-with-large-image-dark.png';
import featureWithSimpleThreeColumnWithSmallIconsLight from './templates/sa-mock-feature-with-simple-three-column-with-small-icons-light.json';
import featureWithSimpleThreeColumnWithSmallIconsLightScreenshot from './templates/sa-mock-feature-with-simple-three-column-with-small-icons-light.png';
import featureWithSimpleThreeColumnWithSmallIconsDark from './templates/sa-mock-feature-with-simple-three-column-with-small-icons-dark.json';
import featureWithSimpleThreeColumnWithSmallIconsDarkScreenshot from './templates/sa-mock-feature-with-simple-three-column-with-small-icons-dark.png';
import featureWithSimpleThreeColumnWithLargeIcons from './templates/sa-mock-feature-with-simple-three-column-with-large-icons.json';
import featureWithSimpleThreeColumnWithLargeIconsScreenshot from './templates/sa-mock-feature-with-simple-three-column-with-large-icons.png';
import featureWithOffsetList from './templates/sa-mock-feature-with-offset-list.json';
import featureWithOffsetListScreenshot from './templates/sa-mock-feature-with-offset-list.png';
import logoCloud from './templates/sa-mock-logo-cloud.json';
import logoCloudScreenshot from './templates/sa-mock-logo-cloud.png';
import featureSimple from './templates/sa-mock-feature-simple.json';
import featureSimpleScreenshot from './templates/sa-mock-feature-simple.png';
import { namespace } from '../../../../namespace.config';
import templateCategoryScreenshot from './templates/sa-mock-category-preview.png';
import templateFeatureWithImageScreenshot from './templates/sa-mock-feature-with-image-right.png';

const templateCategoryPreview: SanityTemplate = {
  name: 'pageBlock',
  namespace: namespace.name,
  title: 'Category Preview',
  description: 'Page Block with Category Preview',
  category: TemplateCategory.pageBlock,
  area: TemplateArea.eCommerce,
  template: categoryPreviewJSON,
  screenshot: templateCategoryScreenshot.src,
};

const templateFeatureGrid2x2: SanityTemplate = {
  name: 'featureGrid2x2',
  namespace: namespace.name,
  title: 'Feature Grid',
  description: 'Page Block with Feature 2x2 gird',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureGrid2x2,
  screenshot: featureGrid2x2Screenshot.src,
};

const templateFeatureWithImageLeft: SanityTemplate = {
  name: 'featureWithImageLeft',
  namespace: namespace.name,
  title: 'Feature With Image on the left',
  description: 'Page Block with Feature Left Image',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureWithImageLeft,
  screenshot: featureWithScreenshot.src,
};

const templateFeatureWithImageRight: SanityTemplate = {
  name: 'featureWithImageRight',
  namespace: namespace.name,
  title: 'Feature With Image on the right',
  description: 'Page Block with Feature Right Image',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureWithImageRight,
  screenshot: templateFeatureWithImageScreenshot.src,
};

const templateFeatureWithLargeScreenshotLight: SanityTemplate = {
  name: 'featureWithLargeImageLight',
  namespace: namespace.name,
  title: 'Feature With Large Image light',
  description: 'Page Block with Feature Large Image light',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureWithLargeImageLight,
  screenshot: featureWithLargeImageLightScreenshot.src,
};

const templateFeatureWithLargeScreenshotDark: SanityTemplate = {
  name: 'featureWithLargeImageDark',
  namespace: namespace.name,
  title: 'Feature With Large Image dark',
  description: 'Page Block with Feature Large Image dark',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureWithLargeImageDark,
  screenshot: featureWithLargeImageDarkScreenshot.src,
};

const templateFeatureWithSimpleThreeColumnWithSmallIconsLight: SanityTemplate =
  {
    name: 'featureWithSimpleThreeColumnWithSmallIconsLight',
    namespace: namespace.name,
    title: 'Feature Simple three column with small icons light',
    description: 'Page Block Simple three column with small icons light',
    category: TemplateCategory.feature,
    area: TemplateArea.marketing,
    template: featureWithSimpleThreeColumnWithSmallIconsLight,
    screenshot: featureWithSimpleThreeColumnWithSmallIconsLightScreenshot.src,
  };

const templateFeatureWithSimpleThreeColumnWithLargeIcons: SanityTemplate = {
  name: 'featureWithSimpleThreeColumnWithLArgeIcons',
  namespace: namespace.name,
  title: 'Feature Simple three column with large icons',
  description: 'Page Block Simple three column with large icons',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureWithSimpleThreeColumnWithLargeIcons,
  screenshot: featureWithSimpleThreeColumnWithLargeIconsScreenshot.src,
};

const templateFeatureOffsetWithList: SanityTemplate = {
  name: 'featureWithOffsetList',
  namespace: namespace.name,
  title: 'Offset with feature list',
  description: 'Page Block with Offset with feature list',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureWithOffsetList,
  screenshot: featureWithOffsetListScreenshot.src,
};

const templateFeatureSimple: SanityTemplate = {
  name: 'featureSimple',
  namespace: namespace.name,
  title: 'Simple',
  description: 'Page Block with simple feature',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureSimple,
  screenshot: featureSimpleScreenshot.src,
};

const templateFeatureWithSimpleThreeColumnWithSmallIconsDark: SanityTemplate = {
  name: 'featureWithSimpleThreeColumnWithSmallIconsDark',
  namespace: namespace.name,
  title: 'Feature Simple three column with small icons dark',
  description: 'Page Block Simple three column with small icons dark',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureWithSimpleThreeColumnWithSmallIconsDark,
  screenshot: featureWithSimpleThreeColumnWithSmallIconsDarkScreenshot.src,
};

const templateLogoCloud: SanityTemplate = {
  name: 'templateLogoCloud',
  namespace: namespace.name,
  title: 'Simple logo cloud',
  description: 'Simple logo cloud',
  category: TemplateCategory.logoCloudGrid,
  area: TemplateArea.marketing,
  template: logoCloud,
  screenshot:logoCloudScreenshot.src,
};

export const PageBlockPresets = [
  templateCategoryPreview,
  templateFeatureGrid2x2,
  templateFeatureWithImageLeft,
  templateFeatureWithImageRight,
  templateFeatureWithLargeScreenshotLight,
  templateFeatureWithLargeScreenshotDark,
  templateFeatureWithSimpleThreeColumnWithSmallIconsLight,
  templateFeatureWithSimpleThreeColumnWithLargeIcons,
  templateFeatureOffsetWithList,
  templateFeatureSimple,
  templateFeatureWithSimpleThreeColumnWithSmallIconsDark,
  templateLogoCloud,
];

export default [
  templateCategoryPreview,
  templateFeatureGrid2x2,
  templateFeatureWithImageLeft,
  templateFeatureWithImageRight,
  templateFeatureWithLargeScreenshotLight,
  templateFeatureWithLargeScreenshotDark,
  templateFeatureWithSimpleThreeColumnWithSmallIconsLight,
  templateFeatureWithSimpleThreeColumnWithLargeIcons,
  templateFeatureOffsetWithList,
  templateFeatureSimple,
  templateFeatureWithSimpleThreeColumnWithSmallIconsDark,
  templateLogoCloud,
];
