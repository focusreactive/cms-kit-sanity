import internalTemplates from '@/namespaces/sa-templates';
import { TemplateCategory, type NameSpaceName } from '@/types';

import type { ContentTypeName, Kit, SanityTemplate } from './types';

export type TemplatesStore = {
  templates: Array<SanityTemplate>;
  byCategory: Array<{
    category: TemplateCategory;
    count: number;
    templates: Array<SanityTemplate>;
  }>;
};

const templatesStore: TemplatesStore = {
  templates: [],
  byCategory: [],
};

export const initTemplatesStore = (
  namespaces: Array<string>,
  customNamespaces?: Array<Kit>,
) => {
  const externalTemplates = customNamespaces
    ? customNamespaces
        .map(ns => ns[ns.name].templates)
        .filter(Boolean)
        .flat()
    : [];

  const templates = [...internalTemplates, ...externalTemplates];
  namespaces.forEach(ns => {
    const temp = templates.filter(({ namespace }) => namespace === ns);
    templatesStore.templates.push(...temp);
  });
  const categories = Object.values(TemplateCategory);
  categories.forEach(cat => {
    const catTemp = templatesStore.templates.filter(
      ({ category }) => category === cat,
    );
    templatesStore.byCategory.push({
      category: cat,
      count: catTemp.length,
      templates: catTemp,
    });
  });
};

export const getTemplates = (): TemplatesStore => {
  if (!templatesStore.templates.length) {
    throw new Error(`cant' find any template`);
  }

  return templatesStore;
};

type SelectTemplatesProps = {
  types: ContentTypeName[];
};

export const selectTemplates = ({
  types,
}: SelectTemplatesProps): TemplatesStore['byCategory'] => {
  const allTemplates = getTemplates().byCategory;
  const selectedTemplates = [];
  allTemplates.forEach(cat => {
    const tt = cat.templates.filter(tp => types.includes(tp.type));
    if (!tt.length) {
      return;
    }
    selectedTemplates.push({
      ...cat,
      templates: tt,
    });
  });

  return selectedTemplates;
};
