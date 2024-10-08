import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';

import { logoCloudGrid } from './sa-schema';
import logoCloudGridJSON from './templates/sa-mock-logo-cloud.json';
import preview from './templates/preview.png';

const templateLogoCloud: SanityTemplate = {
  name: 'logoCloudGrid',
  type: logoCloudGrid.name,
  title: 'Logo cloud grid',
  description: 'Logo Cloud',
  category: TemplateCategory.logoCloudGrid,
  area: TemplateArea.eCommerce,
  template: logoCloudGridJSON,
  height: 88 + 4, // 4 is iframe border
  screenshot: preview.src,
};

export default [templateLogoCloud];
