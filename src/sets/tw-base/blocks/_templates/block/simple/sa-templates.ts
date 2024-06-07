import { namespace } from '@ns/namespace.config';

import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';

import { blockTemplate } from './sa-schema';
import blockTemplateDefaultJSON from './templates/sa-mock-default.json';

const blockTemplateDefault: SanityTemplate = {
  name: 'blockTemplate',
  type: blockTemplate.name,
  namespace: namespace.name,
  title: 'Block Template',
  description: 'Dummy block for development',
  category: TemplateCategory.pageBlock,
  area: TemplateArea.marketing,
  template: blockTemplateDefaultJSON,
  height: 600 + 4, // 4 is iframe border
};

export default [blockTemplateDefault];
