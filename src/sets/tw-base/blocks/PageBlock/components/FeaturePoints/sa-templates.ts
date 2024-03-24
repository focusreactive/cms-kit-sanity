import { namespace } from '@ns/namespace.config';

import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';

import { featurePoints } from './sa-schema';
import json from './templates/sa-mock-feature-points.json';

const featurePointsPreview: SanityTemplate = {
  name: 'Feature points',
  type: featurePoints.name,
  namespace: namespace.name,
  title: 'feature points',
  description: 'feature points',
  category: TemplateCategory.categoryPreview,
  area: TemplateArea.eCommerce,
  template: json,
  height: 368 + 4, // 4 is iframe border
};

export default [featurePointsPreview];
