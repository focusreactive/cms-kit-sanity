import { namespace } from '../../namespace.config';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';
import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';

import { stats } from './sa-schema';
import statsJson from './templates/sa-mock-stats.json';

const templateStats: SanityTemplate = {
  name: 'stats',
  type: stats.name,
  namespace: namespace.name,
  title: 'Stats',
  description: '[twBase] STATS EXTERNAL',
  category: TemplateCategory.stats,
  area: TemplateArea.marketing,
  template: statsJson,
  height: 384 + 4, // 4 is iframe border
};

export default [templateStats];
