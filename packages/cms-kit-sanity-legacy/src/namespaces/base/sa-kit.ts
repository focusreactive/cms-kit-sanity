import type { Kit } from '@/sanity/types';

import { types } from './blocks/sa-schemas';
import { namespace } from './namespace.config';
import { blocksMap } from './blocks/sa-components';

export const kit: Kit = {
  name: namespace.name,
  [namespace.name]: {
    types,
    blocksMap,
  },
};
