import { defineComponentType } from '../../sa-config';

export const smartImage = defineComponentType(() => ({
  name: 'smartImage',
  type: 'image',
  title: 'Smart Image',
  fields: [
    {
      name: 'alt',
      type: 'string',
    },
  ],
}));

export default [smartImage];
