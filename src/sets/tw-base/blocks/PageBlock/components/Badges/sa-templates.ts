import { namespace } from '@ns/namespace.config';

import { TemplateArea, TemplateCategory } from '@/types';
import type { SanityTemplate } from '@/sanity/types';

import { badges } from './sa-schema';
import simpleBadgeJSON from './templates/sa-mock-simple-badge.json';

export const templateSimpleBadge: SanityTemplate = {
  name: 'simpleBadge',
  type: badges.name,
  namespace: namespace.name,
  title: 'Simple Badge',
  description: 'Single primary badge link text',
  category: TemplateCategory.hero,
  area: TemplateArea.marketing,
  template: simpleBadgeJSON,
  height: 64 + 4, // 4 is iframe border
};
