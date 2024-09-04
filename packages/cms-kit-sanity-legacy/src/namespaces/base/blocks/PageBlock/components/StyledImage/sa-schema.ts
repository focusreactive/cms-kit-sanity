import { defineComponentType } from '@ns/sa-config';

import { imageWithMetadata } from '@/sanity/common-schema';

export const styledImage = defineComponentType(({ df }) => ({
  name: 'styledImage',
  type: 'object',
  title: 'Styled Image',
  fields: [
    df({
      name: 'customTitle',
      type: 'string',
    }),
    df({
      name: 'imageWithMetadata',
      type: imageWithMetadata.name,
    }),
  ],
  preview: {
    prepare({ customTitle }) {
      return {
        title: customTitle || 'Image',
        type: 'base.styledImage',
      };
    },
  },
}));

export default [styledImage];
