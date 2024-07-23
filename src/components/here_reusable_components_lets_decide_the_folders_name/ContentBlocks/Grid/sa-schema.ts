import { defineComponentType, defineUtilityType } from '../../sa-config';
import {
  customRichText,
  imageWithMetadata,
  ComponentPreview,
} from '@focus-reactive/cms-kit-sanity/sanity';

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
    // @ts-ignore
    prepare({ customTitle }) {
      return {
        title: customTitle || 'Grid',
        type: 'tw-base.grid',
      };
    },
  },
}));

export default [grid, gridCard];
