import { createTypeGenerators } from '@focus-reactive/cms-kit-sanity/sanity-schema-type-utils';

import { namespace } from './namespace.config';

export const { defineBlockType, defineUtilityType, defineComponentType } =
  createTypeGenerators({
    namespace,
  });
