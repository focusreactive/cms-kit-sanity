import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';

import { namespace } from '../../../../namespace.config';
import { styledRichText } from './sa-schema';
import json from './templates/sa-mock.json';
import preview from './templates/preview.png';


const styledRichTextPreview: SanityTemplate = {
  name: 'styledRichText',
  type: styledRichText.name,
  namespace: namespace.name,
  title: 'Styled Rich Text',
  description: 'Styled Rich Text',
  category: TemplateCategory.categoryPreview,
  area: TemplateArea.eCommerce,
  template: json,
  height: 136 + 4, // 4 is iframe border
  screenshot: preview.src,
};

export default [styledRichTextPreview];
