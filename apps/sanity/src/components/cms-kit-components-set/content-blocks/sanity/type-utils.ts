import { createTypeGenerators } from '@focus-reactive/cms-kit-sanity/sanity-schema-type-utils';

import { setName } from '../set.config';

export const { defineBlockType, defineUtilityType, defineComponentType } =
  createTypeGenerators({
    namespace: setName,
  });
