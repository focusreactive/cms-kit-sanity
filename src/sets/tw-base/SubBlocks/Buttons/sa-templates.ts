import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';

import { buttons } from './sa-schema';
import twoButtons from './templates/sa-mock-two-buttons.json';
import { namespace } from '../../namespace.config';

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

export default [templateTwoButtons];
