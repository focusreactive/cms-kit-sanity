import { namespace } from '@ns/namespace.config';

import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';

import { {{schemaName}} } from './sa-schema';
import {{schemaName}}DefaultJSON from './templates/sa-mock-default.json';

const {{schemaName}}Default: SanityTemplate = {
  name: '{{schemaName}}',
  type: {{schemaName}}.name,
  namespace: namespace.name,
  title: '{{schemaTitle}}',
  description: 'Dummy block for development',
  category: TemplateCategory.pageBlock,
  area: TemplateArea.marketing,
  template: {{schemaName}}DefaultJSON,
  height: 600 + 4, // 4 is iframe border
};

export default [{{schemaName}}Default];
