import type React from 'react';

import type {
  NameSpaceName,
  TemplateArea,
  TemplateCategory,
  TemplateName,
} from '@/types';

export type ComponentsStore = {
  namespaces: Array<NameSpaceName>;
  blocksMap: BlocksMap;
  initialized: boolean;
};

export type ComponentTypes = {
  [key in NameSpaceName]: {
    types: Array<ExtendedType>;
  };
};

export enum GroupOptions {
  BLOCK = 'BLOCK',
  UTILS = 'UTILS',
  GLOBAL = 'GLOBAL',
  COMPONENT = 'COMPONENT',
}

export type TypeOptions = {
  group?: GroupOptions;
};

export type ExtendedType = {
  name: ContentTypeName;
  type: 'document' | 'object';
  title: string;
  description: string;
  fields?: Array<NonNullable<unknown>>;
  kitOptions?: TypeOptions;
};

export type ContentBlockGeneric = {
  _type: ContentTypeName;
};

export type ContentBlockData = ContentBlockGeneric & {
  [key: string]: any;
};

export type ContentTypeName = string;
export type BlocksMap = {
  [key: ContentTypeName]: React.FC<ContentBlockData> & {
    isServerComponent?: boolean;
  };
};

export type InternalKitDefinition = {
  types: Array<ExtendedType>;
  blocksMap: Array<React.FC<never>>;
  // TODO: make mandatory for external namespace
  templates?: Array<SanityTemplate>;
};

export type Kit = {
  name: string;
  base?: InternalKitDefinition;
  land?: InternalKitDefinition;
};

export type SanityTemplate = {
  name: TemplateName;
  type: ContentTypeName;
  namespace: NameSpaceName;
  title: string;
  description: string;
  category: TemplateCategory;
  area: TemplateArea;
  template: object;
  screenshot?: string;
  height?: number;
};
