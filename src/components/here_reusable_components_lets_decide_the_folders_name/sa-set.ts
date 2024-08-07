import type { Kit } from '@focus-reactive/cms-kit-sanity/sanity';

import { namespace } from './namespace.config';
import { contentBlocksSchemas } from './ContentBlocks/sa-schemas';
import { subBlocksSchemas } from './SubBlocks/sa-schemas';
import { contentComponentsSchemas } from './ContentComponents/sa-schemas';
import { contentBlocksMap } from './ContentBlocks/sa-components';
import { contentBlockTemplates } from './ContentBlocks/sa-templates';
import { subBlocksMap } from './SubBlocks/sa-components';
import { subBlockTemplates } from './SubBlocks/sa-templates';
import { Preset } from '@/sanity/plugins/content-blocks';

export const blockTypes = [
  ...contentBlocksSchemas,
  ...subBlocksSchemas,
  ...contentComponentsSchemas,
];

export const templates = [...contentBlockTemplates, ...subBlockTemplates];
export const presets: Preset[] = templates.map((t) => ({
  name: t.name,
  value: t.template,
  meta: { ...t, template: undefined },
})) as Preset[];

export const twBase: Kit = {
  name: namespace.name,
  [namespace.name]: {
    types: blockTypes,
    blocksMap: { ...contentBlocksMap, ...subBlocksMap },
    templates: templates,
  },
};
