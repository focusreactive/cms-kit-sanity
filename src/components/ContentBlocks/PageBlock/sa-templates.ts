import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';

import { pageBlock } from './sa-schema';
import categoryPreviewJSON from './templates/sa-mock-category-preview.json';
import featureGrid2x2 from './templates/sa-mock-feature-grid-2x2.json';
import featureWithImageLeft from './templates/sa-mock-feature-with-image-left.json';
import featureWithImageRight from './templates/sa-mock-feature-with-image-right.json';
import featureWithLargeImageLight from './templates/sa-mock-feature-with-large-image-light.json';
import featureWithLargeImageDark from './templates/sa-mock-feature-with-large-image-dark.json';
import featureWithSimpleThreeColumnWithSmallIconsLight from './templates/sa-mock-feature-with-simple-three-column-with-small-icons-light.json';
import featureWithSimpleThreeColumnWithSmallIconsDark from './templates/sa-mock-feature-with-simple-three-column-with-small-icons-dark.json';
import featureWithSimpleThreeColumnWithLargeIcons from './templates/sa-mock-feature-with-simple-three-column-with-large-icons.json';
import featureWithOffsetList from './templates/sa-mock-feature-with-offset-list.json';
import logoCloud from './templates/sa-mock-logo-cloud.json';
import featureSimple from './templates/sa-mock-feature-simple.json';
import { namespace } from '../../namespace.config';

const templateCategoryPreview: SanityTemplate = {
  name: 'pageBlock',
  type: pageBlock.name,
  namespace: namespace.name,
  title: 'Category Preview',
  description: 'Page Block with Category Preview',
  category: TemplateCategory.pageBlock,
  area: TemplateArea.eCommerce,
  template: categoryPreviewJSON,
  height: 568 + 4, // 4 is iframe border
};

const templateFeatureGrid2x2: SanityTemplate = {
  name: 'featureGrid2x2',
  type: pageBlock.name,
  namespace: namespace.name,
  title: 'Feature Grid',
  description: 'Page Block with Feature 2x2 gird',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureGrid2x2,
  screenshot:
    'https://cdn.sanity.io/images/euty36ag/production/5475468e66dbeb73d8b56ccb5256620418b4c5f2-3390x1606.png',
  height: 848 + 4, // 4 is iframe border
};

const templateFeatureWithImageLeft: SanityTemplate = {
  name: 'featureWithImageLeft',
  type: pageBlock.name,
  namespace: namespace.name,
  title: 'Feature With Image on the left',
  description: 'Page Block with Feature Left Image',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureWithImageLeft,
  screenshot:
    'https://cdn.sanity.io/images/euty36ag/production/ec29eb7ea88c3e2ea9e0102eb204708880e764d4-3390x1606.png',
  height: 936 + 4, // 4 is iframe border
};

const templateFeatureWithImageRight: SanityTemplate = {
  name: 'featureWithImageRight',
  type: pageBlock.name,
  namespace: namespace.name,
  title: 'Feature With Image on the right',
  description: 'Page Block with Feature Right Image',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureWithImageRight,
  screenshot:
    'https://cdn.sanity.io/images/euty36ag/production/0559c32e571a37898faf9c96a15cf0ad1a3b6e7c-3382x1412.png',
  height: 936 + 4, // 4 is iframe border
};

const templateFeatureWithLargeScreenshotLight: SanityTemplate = {
  name: 'featureWithLargeImageLight',
  type: pageBlock.name,
  namespace: namespace.name,
  title: 'Feature With Large Image light',
  description: 'Page Block with Feature Large Image light',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureWithLargeImageLight,
  screenshot:
    'https://cdn.sanity.io/images/euty36ag/production/1c5862b7cd8b308e7c7a06f5d12f225c57b901c4-2432x1694.png',
  height: 1345 + 4, // 4 is iframe border
};

const templateFeatureWithLargeScreenshotDark: SanityTemplate = {
  name: 'featureWithLargeImageDark',
  type: pageBlock.name,
  namespace: namespace.name,
  title: 'Feature With Large Image dark',
  description: 'Page Block with Feature Large Image dark',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureWithLargeImageDark,
  screenshot:
    'https://cdn.sanity.io/images/euty36ag/production/09088793adc2e8b57fce3a099eb3fcf8ad8cb744-2432x1722.png',
  height: 1345 + 4, // 4 is iframe border
};

const templateFeatureWithSimpleThreeColumnWithSmallIconsLight: SanityTemplate =
  {
    name: 'featureWithSimpleThreeColumnWithSmallIconsLight',
    type: pageBlock.name,
    namespace: namespace.name,
    title: 'Feature Simple three column with small icons light',
    description: 'Page Block Simple three column with small icons light',
    category: TemplateCategory.feature,
    area: TemplateArea.marketing,
    template: featureWithSimpleThreeColumnWithSmallIconsLight,
    screenshot:
      'https://cdn.sanity.io/images/euty36ag/production/8421ec0f12bde66b30940fa2385e327addff001b-3392x1446.png',
    height: 724 + 4, // 4 is iframe border
  };

const templateFeatureWithSimpleThreeColumnWithLargeIcons: SanityTemplate = {
  name: 'featureWithSimpleThreeColumnWithLArgeIcons',
  type: pageBlock.name,
  namespace: namespace.name,
  title: 'Feature Simple three column with large icons',
  description: 'Page Block Simple three column with large icons',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureWithSimpleThreeColumnWithLargeIcons,
  screenshot:
    'https://cdn.sanity.io/images/euty36ag/production/0e1ec692afdc9e643a65e2db11d8fde5e2caaf65-3392x1446.png',
  height: 760 + 4, // 4 is iframe border
};

const templateFeatureOffsetWithList: SanityTemplate = {
  name: 'featureWithOffsetList',
  type: pageBlock.name,
  namespace: namespace.name,
  title: 'Offset with feature list',
  description: 'Page Block with Offset with feature list',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureWithOffsetList,
  screenshot:
    'https://cdn.sanity.io/images/euty36ag/production/aa173f6b8b80df4dbb473068e52e5c28d0c0d819-3392x1602.png',
  height: 1152 + 4, // 4 is iframe border
};

const templateFeatureSimple: SanityTemplate = {
  name: 'featureSimple',
  type: pageBlock.name,
  namespace: namespace.name,
  title: 'Simple',
  description: 'Page Block with simple feature',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureSimple,
  screenshot:
    'https://cdn.sanity.io/images/euty36ag/production/aab75586e6aa1f3f558b9424b4ad9242067a7a97-3392x1688.png',
  height: 896 + 4, // 4 is iframe border
};

const templateFeatureWithSimpleThreeColumnWithSmallIconsDark: SanityTemplate = {
  name: 'featureWithSimpleThreeColumnWithSmallIconsDark',
  type: pageBlock.name,
  namespace: namespace.name,
  title: 'Feature Simple three column with small icons dark',
  description: 'Page Block Simple three column with small icons dark',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featureWithSimpleThreeColumnWithSmallIconsDark,
  screenshot:
    'https://cdn.sanity.io/images/euty36ag/production/40e814d97169052b4c114dcc43d369f400a9f71e-3392x1446.png',
  height: 724 + 4, // 4 is iframe border
};

const templateLogoCloud: SanityTemplate = {
  name: 'templateLogoCloud',
  type: pageBlock.name,
  namespace: namespace.name,
  title: 'Simple logo cloud',
  description: 'Simple logo cloud',
  category: TemplateCategory.logoCloudGrid,
  area: TemplateArea.marketing,
  template: logoCloud,
  screenshot:
    'https://cdn.sanity.io/images/euty36ag/production/40e814d97169052b4c114dcc43d369f400a9f71e-3392x1446.png',
  height: 381 + 4, // 4 is iframe border
};

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
