import type { Kit } from '@focus-reactive/cms-kit-sanity/sanity';

import { namespace } from './namespace.config';
import { contentBlocksSchemas } from './content-blocks/sanity/root-blocks/sa-schemas';
import { subBlocksSchemas } from './content-blocks/sanity/sub-blocks/sa-schemas';
import { contentComponentsSchemas } from './content-blocks/sanity/functional-blocks/sa-schemas';
import { contentBlocksMap } from './content-blocks/sanity/root-blocks/sa-components';
import { contentBlockPresets } from './content-blocks/sanity/root-blocks/sa-templates';
import { subBlocksMap } from './content-blocks/sanity/sub-blocks/sa-components';
import { subBlockTemplates } from './content-blocks/sanity/sub-blocks/sa-templates';
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
