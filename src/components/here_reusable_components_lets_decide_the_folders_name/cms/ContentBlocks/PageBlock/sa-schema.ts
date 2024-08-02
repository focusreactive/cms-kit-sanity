import { BlockPreview } from '@focus-reactive/cms-kit-sanity/sanity';

import { blogSection } from '../BlogSection/sa-schema';
import { logoCloudGrid } from '../../SubBlocks/LogoCloud/sa-schema';
import { grid } from '../Grid/sa-schema';
import { styledImage } from '../../SubBlocks/StyledImage/sa-schema';
import { featurePoints } from '../../SubBlocks/FeaturePoints/sa-schema';
import { styledRichText } from '../../SubBlocks/StyledRichText/sa-schema';
import { buttons } from '../../SubBlocks/Buttons/sa-schema';
import { badges } from '../../SubBlocks/Badges/sa-schema';
import { defineBlockType } from '../../../sa-config';
import { blockOptions } from '../../ContentComponents/Section';
import { defineBlocksField } from '@/sanity/plugins/content-blocks/define-blocks-field';
import { subBlockPresets } from '../../SubBlocks/sa-templates';
import { renderItemView } from '@/sanity/plugins/blocks-preview/render-item-view';

export const pageBlock = defineBlockType(({ df }) => ({
  name: 'pageBlock',
  type: 'object',
  title: 'Page Block',
  fields: [
    defineBlocksField({
      name: 'components',
      of: [
        { type: badges.name },
        { type: buttons.name },
        { type: styledRichText.name },
        { type: styledImage.name },
        { type: featurePoints.name },
        { type: logoCloudGrid.name },
      ],
      options: {
        presets: subBlockPresets,
        renderItemView: renderItemView,
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
