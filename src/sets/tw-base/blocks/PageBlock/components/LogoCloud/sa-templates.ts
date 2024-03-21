import { namespace } from '@ns/namespace.config';

import { TemplateArea, TemplateCategory } from '@/types';
import type { SanityTemplate } from '@/sanity/types';

import { logoCloudGrid } from './sa-schema';
import logoCloudGridJSON from './templates/sa-mock-logo-cloud.json';

const templateLogoCloud: SanityTemplate = {
  name: 'logoCloudGrid',
  type: logoCloudGrid.name,
  namespace: namespace.name,
  title: 'Logo cloud grid',
  description: 'Logo Cloud',
  category: TemplateCategory.logoCloudGrid,
  area: TemplateArea.eCommerce,
  template: logoCloudGridJSON,
  height: 88 + 4, // 4 is iframe border
};

export default [templateLogoCloud];
