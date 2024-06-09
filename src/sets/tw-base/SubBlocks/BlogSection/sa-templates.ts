import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';

import blogJSON from './templates/sa-mock-blog-section.json';
import threeColumnWithImages from './templates/three-column-with-images.json';
import { pageBlock } from '../../ContentBlocks/PageBlock/sa-schema';
import { namespace } from '../../namespace.config';

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
  name: 'blogSectionWithImages',
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
