import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';

import { namespace } from '../../namespace.config';
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
