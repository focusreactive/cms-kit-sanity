import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';

import { featurePoints } from './sa-schema';
import json from './templates/sa-mock-feature-points.json';
import { namespace } from '../../../../namespace.config';
import preview from './templates/preview.png';

const featurePointsPreview: SanityTemplate = {
  name: 'featurePoints',
  type: featurePoints.name,
  namespace: namespace.name,
  title: 'Feature Points',
  description: 'feature points',
  category: TemplateCategory.categoryPreview,
  area: TemplateArea.eCommerce,
  template: json,
  height: 368 + 4, // 4 is iframe border
  screenshot: preview.src,
};

export default [featurePointsPreview];
