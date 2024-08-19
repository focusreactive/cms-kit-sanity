import type { Kit } from '@focus-reactive/cms-kit-sanity/sanity';

import { setName } from '../set.config';
import { contentBlocksSchemas } from './root-blocks/sa-schemas';
import { subBlocksSchemas } from './sub-blocks/sa-schemas';
import { contentComponentsSchemas } from './functional-blocks/sa-schemas';
import { contentBlocksMap } from './root-blocks/sa-components';
import { contentBlockPresets } from './root-blocks/sa-templates';
import { subBlocksMap } from './sub-blocks/sa-components';
import { subBlockTemplates } from './sub-blocks/sa-templates';
import { Preset } from '@/cms/plugins/content-blocks';

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
  name: setName.name,
  [setName.name]: {
    types: blockTypes,
    blocksMap: { ...contentBlocksMap, ...subBlocksMap },
    templates: templates,
  },
};

export default twBase;