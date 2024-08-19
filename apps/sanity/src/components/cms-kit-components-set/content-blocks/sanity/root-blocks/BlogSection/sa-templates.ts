import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';
import type { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';

import blogJSON from './templates/sa-mock-blog-section.json';
import screenshot from './templates/sa-mock-blog-section.png';
import threeColumnWithImages from './templates/three-column-with-images.json';
import threeColumnWithImagesScreenshot from './templates/three-column-with-images.png';
import { namespace } from '../../../../namespace.config';

const templateBlogSection: SanityTemplate = {
  name: 'blogSection',
  namespace: namespace.name,
  title: 'Blog section',
  description: 'Blog section',
  category: TemplateCategory.blogSection,
  area: TemplateArea.marketing,
  template: blogJSON,
  screenshot: screenshot.src,
};

const templateBlogSectionThree: SanityTemplate = {
  name: 'blogSectionWithImages',
  namespace: namespace.name,
  title: 'Blog section with images',
  description: 'Blog section',
  category: TemplateCategory.blogSection,
  area: TemplateArea.marketing,
  template: threeColumnWithImages,
  screenshot: threeColumnWithImagesScreenshot.src,
};
export default [templateBlogSection, templateBlogSectionThree];
