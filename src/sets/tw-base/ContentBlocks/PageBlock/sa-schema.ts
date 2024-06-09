import {
  TemplateSelector,
  BlockPreview,
} from '@focus-reactive/cms-kit-sanity/sanity';

import { blogSection } from '../../SubBlocks/BlogSection/sa-schema';
import { logoCloudGrid } from '../../SubBlocks/LogoCloud/sa-schema';
import { grid } from '../../SubBlocks/Grid/sa-schema';
import { styledImage } from '../../SubBlocks/StyledImage/sa-schema';
import { featurePoints } from '../../SubBlocks/FeaturePoints/sa-schema';
import { styledRichText } from '../../SubBlocks/StyledRichText/sa-schema';
import { buttons } from '../../SubBlocks/Buttons/sa-schema';
import { badges } from '../../SubBlocks/Badges/sa-schema';
import { defineBlockType } from '../../sa-config';
import { blockOptions } from '../../ContentComponents/Section';

export const pageBlock = defineBlockType(({ df }) => ({
  name: 'pageBlock',
  type: 'object',
  title: 'Page Block',
  fields: [
    df({
      name: 'components',
      type: 'array',
      of: [
        { type: grid.name },
        { type: styledImage.name },
        { type: featurePoints.name },
        { type: styledRichText.name },
        { type: logoCloudGrid.name },
        { type: blogSection.name },
        { type: buttons.name },
        { type: badges.name },
      ],

      components: {
        field: TemplateSelector,
      },
    }),
    df({
      name: 'customTitle',
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

export default [pageBlock];
