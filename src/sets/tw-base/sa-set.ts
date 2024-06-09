import type { Kit } from '@focus-reactive/cms-kit-sanity/sanity';

import { types } from './ContentBlocks/sa-schemas';
import { namespace } from './namespace.config';
import { blocksMap } from './ContentBlocks/sa-components';
import templates from './ContentBlocks/sa-templates'

export const twBase: Kit = {
  name: namespace.name,
  [namespace.name]: {
    types,
    blocksMap,
    templates
  },
};
