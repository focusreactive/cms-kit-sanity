---
to: ContentBlocks/<%= h.inflection.camelize(name, false) %>/sa-templates.ts
---
import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';

import { <%= h.inflection.camelize(name, true) %> } from './sa-schema';
import <%= h.inflection.camelize(name, true) %>DefaultJSON from './templates/sa-mock-default.json';
import { namespace } from '../../namespace.config';

const <%= h.inflection.camelize(name, true) %>Default: SanityTemplate = {
  name: '<%= h.inflection.camelize(name, true) %>',
  type: <%= h.inflection.camelize(name, true) %>.name,
  namespace: namespace.name,
  title: '<%= h.inflection.titleize(name) %>',
  description: 'Starting block for development',
  category: TemplateCategory.pageBlock,
  area: TemplateArea.marketing,
  template: <%= h.inflection.camelize(name, true) %>DefaultJSON,
  height: 600 + 4, // 4 is iframe border
};

export default [<%= h.inflection.camelize(name, true) %>Default];
