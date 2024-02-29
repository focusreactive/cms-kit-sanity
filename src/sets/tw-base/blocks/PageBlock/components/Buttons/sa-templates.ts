import { namespace } from '@ns/namespace.config';

import { TemplateArea, TemplateCategory } from '@/types';
import type { SanityTemplate } from '@/sanity/types';

import { buttons } from './sa-schema';
import twoButtons from './templates/sa-mock-two-buttons.json';

export const templateTwoButtons: SanityTemplate = {
  name: 'twoButtons',
  type: buttons.name,
  namespace: namespace.name,
  title: 'Two buttons',
  description: 'Primary and secondary link buttons',
  category: TemplateCategory.hero,
  area: TemplateArea.marketing,
  template: twoButtons,
  height: 80 + 4, // 4 is iframe border
};
