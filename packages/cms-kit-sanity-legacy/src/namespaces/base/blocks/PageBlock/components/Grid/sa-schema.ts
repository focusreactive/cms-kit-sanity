import { defineComponentType, defineUtilityType } from '@ns/sa-config';

import { customRichText, imageWithMetadata } from '@/sanity/common-schema';
import { ComponentPreview } from '@/sanity/model/components';

export const gridCard = defineUtilityType(({ df }) => ({
  name: 'gridCard',
  type: 'object',
  title: 'Grid Card',
  fields: [
    df({
      name: 'imageWithMetadata',
      type: imageWithMetadata.name,
    }),
    df({ name: 'customRichText', type: customRichText.name }),
    df({
      name: 'smartLink', // TODO: replace with smartLink
      type: 'string',
    }),
  ],
}));

export const grid = defineComponentType(({ df }) => ({
  name: 'grid',
  type: 'object',
  title: 'Grid',
  fields: [
    df({
      name: 'customTitle',
      type: 'string',
    }),
    df({ name: 'title', type: 'string' }),
    df({
      name: 'items',
      type: 'array',
      of: [df({ name: 'gridCard', type: gridCard.name })],
    }),
  ],
  components: { preview: ComponentPreview },
  preview: {
    prepare({ customTitle }) {
      return {
        title: customTitle || 'Grid',
        type: 'base.grid',
      };
    },
  },
}));

export default [grid, gridCard];
