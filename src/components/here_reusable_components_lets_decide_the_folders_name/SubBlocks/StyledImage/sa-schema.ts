import { defineComponentType } from '../../sa-config';

import { imageWithMetadata } from '@focus-reactive/cms-kit-sanity/sanity';

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
    // @ts-ignore
    prepare({ customTitle }) {
      return {
        title: customTitle || 'Image',
        type: 'tw-base.styledImage',
      };
    },
  },
}));

export default [styledImage];
