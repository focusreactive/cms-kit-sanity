---
to: ContentBlocks/<%= h.inflection.camelize(name, false) %>/sa-schema.ts
---
import {
  BlockPreview,
  customRichText,
  imageWithMetadata,
} from '@focus-reactive/cms-kit-sanity/sanity';
import { defineBlockType } from '../../sa-config';
import { blockOptions } from '../../ContentComponents/Section';

export const <%= h.inflection.camelize(name, true) %> = defineBlockType(({ df }) => ({
  name: '<%= h.inflection.camelize(name, true) %>',
  type: 'object',
  title: '<%= h.inflection.titleize(name) %>',
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
    df({
      name: 'blockOptions',
      type: blockOptions.name,
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
        title: customTitle || '<%= h.inflection.titleize(name) %>',
        customTitle,
        components,
        blockOptions,
      };
    },
  },
}));

export default [<%= h.inflection.camelize(name, true) %>];
