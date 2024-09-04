import { createTypeGenerators } from '@/sanity/model/typeGenerators';

import { namespace } from './namespace.config';


export const { defineBlockType, defineUtilityType } = createTypeGenerators({
  namespace,
});
