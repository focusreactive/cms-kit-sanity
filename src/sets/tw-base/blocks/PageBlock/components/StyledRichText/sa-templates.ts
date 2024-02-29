import { namespace } from '@ns/namespace.config';

import { TemplateArea, TemplateCategory } from '@/types';
import type { SanityTemplate } from '@/sanity/types';

import { styledRichText } from './sa-schema';
import json from './templates/sa-mock.json';

const styledRichTextPreview: SanityTemplate = {
  name: 'Styled rich text',
  type: styledRichText.name,
  namespace: namespace.name,
  title: 'Styled rich text',
  description: 'Styled rich text',
  category: TemplateCategory.categoryPreview,
  area: TemplateArea.eCommerce,
  template: json,
  height: 136 + 4, // 4 is iframe border
};

export default [styledRichTextPreview];
