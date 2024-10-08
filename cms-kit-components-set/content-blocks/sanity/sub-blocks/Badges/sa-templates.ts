import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';

import { badges } from './sa-schema';
import simpleBadgeJSON from './templates/sa-mock-simple-badge.json';
import preview from './templates/preview.png';

export const templateSimpleBadge: SanityTemplate = {
  name: 'simpleBadge',
  type: badges.name,
  title: 'Simple Badge',
  description: 'Single primary badge link text',
  category: TemplateCategory.hero,
  area: TemplateArea.marketing,
  template: simpleBadgeJSON,
  height: 64 + 4, // 4 is iframe border
  screenshot: preview.src,
};

export default [templateSimpleBadge];
