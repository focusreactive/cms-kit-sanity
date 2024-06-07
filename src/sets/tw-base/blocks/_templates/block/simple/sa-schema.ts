import { defineBlockType } from '@ns/sa-config';

import {
  BlockPreview,
  customRichText,
  imageWithMetadata,
} from '@focus-reactive/cms-kit-sanity/sanity';

export const blockTemplate = defineBlockType(({ df }) => ({
  name: 'blockTemplate',
  type: 'object',
  title: 'Block Template',
  fields: [
    df({
      name: 'title',
      type: 'string',
    }),
    df({
      name: 'description',
      type: customRichText.name,
    }),
    df({
      name: 'image',
      type: imageWithMetadata.name,
    }),
    df({
      name: 'backgroundColor',
      type: 'string',
    }),
  ],
  components: { preview: BlockPreview },
  preview: {
    select: {
      customTitle: 'title',
      components: 'components',
      blockOptions: 'blockOptions',
    },
    // @ts-ignore
    prepare({ components, blockOptions, customTitle }) {
      return {
        title: customTitle || 'Block Template',
        customTitle,
        components,
        blockOptions,
      };
    },
  },
}));

export default [blockTemplate];
