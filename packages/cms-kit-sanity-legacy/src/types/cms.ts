export enum CMSNames {
  sa = 'sa', // Sanity
  sb = 'sb', // Storyblok
  na = 'na', // N/A
}

export type CurrentCMS = {
  name: CMSNames;
  title: string;
};

export type TemplateName = string;

export enum TemplateCategory {
  hero = 'hero',
  feature = 'feature',
  cta = 'cta',
  pricing = 'pricing',
  header = 'header',
  newsletter = 'newsletter',
  stats = 'stats',
  testimonials = 'testimonials',
  blog = 'blog',
  contact = 'contact',
  team = 'team',
  content = 'content',
  faq = 'faq',
  footer = 'footer',
  pageBlock = 'pageBlock',
  categoryPreview = 'categoryPreview',
  logoCloudGrid = 'logoCloudGrid',
  blogSection = 'blogSection',
}

export enum TemplateArea {
  marketing = 'marketing',
  eCommerce = 'eCommerce',
}

export type PropsWithCMS = { cms: CMSNames };
