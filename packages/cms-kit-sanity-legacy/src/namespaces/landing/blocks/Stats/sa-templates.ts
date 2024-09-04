import { namespace } from '@ns/namespace.config';

import { TemplateArea, TemplateCategory } from '@/types';
import type { SanityTemplate } from '@/sanity/types';

import { stats } from './sa-schema';
import detailsJson from './templates/sa-mock-details.json';
import featuresJson from './templates/sa-mock-features.json';
import statsJson from './templates/sa-mock-stats.json';

const templateDetails: SanityTemplate = {
  name: 'details',
  type: stats.name,
  namespace: namespace.name,
  title: 'Details',
  description: 'Three columns with numbers and details',
  category: TemplateCategory.stats,
  area: TemplateArea.marketing,
  template: detailsJson,
};

const templateFeatures: SanityTemplate = {
  name: 'features',
  type: stats.name,
  namespace: namespace.name,
  title: 'Features',
  description: 'Three columns with features highlights',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: featuresJson,
};

const templateStats: SanityTemplate = {
  name: 'stats',
  type: stats.name,
  namespace: namespace.name,
  title: 'Stats',
  description: 'Three columns with stats',
  category: TemplateCategory.stats,
  area: TemplateArea.marketing,
  template: statsJson,
};

export default [templateDetails, templateFeatures, templateStats];
