import type { Kit } from '@focus-reactive/cms-kit-sanity/sanity';

import { namespace } from './namespace.config';
import { contentBlocksSchemas } from './cms/ContentBlocks/sa-schemas';
import { subBlocksSchemas } from './cms/SubBlocks/sa-schemas';
import { contentComponentsSchemas } from './cms/ContentComponents/sa-schemas';
import { contentBlocksMap } from './cms/ContentBlocks/sa-components';
import { contentBlockPresets } from './cms/ContentBlocks/sa-templates';
import { subBlocksMap } from './cms/SubBlocks/sa-components';
import { subBlockTemplates } from './cms/SubBlocks/sa-templates';
import { Preset } from '@/sanity/plugins/content-blocks';

export const blockTypes = [
  ...contentBlocksSchemas,
  ...subBlocksSchemas,
  ...contentComponentsSchemas,
];

export const templates = [...contentBlockPresets, ...subBlockTemplates];
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
