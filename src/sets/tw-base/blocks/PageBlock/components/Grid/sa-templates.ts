import { namespace } from '@ns/namespace.config';

import { TemplateArea, TemplateCategory } from '@/types';
import type { SanityTemplate } from '@/sanity/types';

import { grid } from './sa-schema';
import categoryPreviewJSON from './templates/sa-mock-category-preview.json';

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
