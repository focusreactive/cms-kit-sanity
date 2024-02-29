import { namespace } from '@ns/namespace.config';
import { pageBlock } from '@ns/blocks/PageBlock/sa-schema';

import { TemplateArea, TemplateCategory } from '@/types';
import type { SanityTemplate } from '@/sanity/types';

import blogJSON from './templates/sa-mock-blog-section.json';
import threeColumnWithImages from './templates/three-column-with-images.json';
const templateBlogSection: SanityTemplate = {
  name: 'blogSection',
  type: pageBlock.name,
  namespace: namespace.name,
  title: 'Blog section',
  description: 'Blog section',
  category: TemplateCategory.blogSection,
  area: TemplateArea.marketing,
  template: blogJSON,
  height: 945 + 4, // 4 is iframe border
};

const templateBlogSectionThree: SanityTemplate = {
  name: 'blogSection',
  type: pageBlock.name,
  namespace: namespace.name,
  title: 'Blog section with images',
  description: 'Blog section',
  category: TemplateCategory.blogSection,
  area: TemplateArea.marketing,
  template: threeColumnWithImages,
  height: 1125 + 4, // 4 is iframe border
};
export default [templateBlogSection, templateBlogSectionThree];
