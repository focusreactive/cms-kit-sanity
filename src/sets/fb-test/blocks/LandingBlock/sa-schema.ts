import {
  TemplateSelector,
  BlockPreview,
  imageWithMetadata,
} from '@focus-reactive/cms-kit-sanity/sanity';

import { defineBlockType, defineUtilityType } from '../../sa-config';

export const landingBlock = defineBlockType(({ df }) => ({
  name: 'landingBlock',
  type: 'object',
  title: 'Landing Block',
  fields: [
    // df({
    //   name: 'components',
    //   type: 'array',
    //   of: [
    //     df({ type: grid.name, name: grid.name }),
    //     df({ type: styledImage.name, name: styledImage.name }),
    //     df({ type: featurePoints.name, name: featurePoints.name }),
    //     df({ type: styledRichText.name, name: styledRichText.name }),
    //     df({ type: logoCloudGrid.name, name: logoCloudGrid.name }),
    //     df({ type: blogSection.name, name: blogSection.name }),
    //     df({ type: buttons.name, name: buttons.name }),
    //     df({ type: badges.name, name: badges.name }),
    //   ],

    //   components: {
    //     field: TemplateSelector,
    //   },
    // }),
    df({
      name: 'title',
      type: 'string',
    }),
    df({
      name: 'description',
      type: 'string',
    }),
    df({
      name: 'teamMembers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
    }),
    // df({
    //   name: 'blockOptions',
    //   type: blockOptions.name,
    // }),
  ],
  components: { preview: BlockPreview },
  preview: {
    select: {
      customTitle: 'customTitle',
      components: 'components',
      blockOptions: 'blockOptions',
    },
    // @ts-ignore
    prepare({ components, blockOptions, customTitle }) {
      return {
        title: customTitle || 'Page block',
        customTitle,
        components,
        blockOptions,
      };
    },
  },
}));

export default [landingBlock];
