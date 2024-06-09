import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';

import { grid } from './sa-schema';
import categoryPreviewJSON from './templates/sa-mock-category-preview.json';
import { namespace } from '../../namespace.config';

const templateCategoryPreview: SanityTemplate = {
  name: 'grid',
  type: grid.name,
  namespace: namespace.name,
  title: 'Grid',
  description: 'Category Preview',
  category: TemplateCategory.categoryPreview,
  area: TemplateArea.eCommerce,
  template: categoryPreviewJSON,
  height: 308 + 4, // 4 is iframe border
};

export default [templateCategoryPreview];
