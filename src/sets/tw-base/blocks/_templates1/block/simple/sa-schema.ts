import { defineBlockType } from '@ns/sa-config';

import {
  BlockPreview,
  customRichText,
  imageWithMetadata,
} from '@focus-reactive/cms-kit-sanity/sanity';

export const {{schemaName}} = defineBlockType(({ df }) => ({
  name: '{{schemaName}}',
  type: 'object',
  title: '{{schemaTitle}}',
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
        title: customTitle || '{{schemaTitle}}',
        customTitle,
        components,
        blockOptions,
      };
    },
  },
}));

export default [{{schemaName}}];
