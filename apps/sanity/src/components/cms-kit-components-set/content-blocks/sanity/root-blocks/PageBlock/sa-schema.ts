import { BlockPreview } from '@focus-reactive/cms-kit-sanity/sanity';

import { blogSection } from '../BlogSection/sa-schema';
import { logoCloudGrid } from '../../sub-blocks/LogoCloud/sa-schema';
import { grid } from '../Grid/sa-schema';
import { styledImage } from '../../sub-blocks/StyledImage/sa-schema';
import { featurePoints } from '../../sub-blocks/FeaturePoints/sa-schema';
import { styledRichText } from '../../sub-blocks/StyledRichText/sa-schema';
import { buttons } from '../../sub-blocks/Buttons/sa-schema';
import { badges } from '../../sub-blocks/Badges/sa-schema';
import { defineBlockType } from '../../../../sa-config';
import { blockOptions } from '../../../../ui-layer/Section';
import { defineBlocksField } from '@/sanity/plugins/content-blocks/define-blocks-field';
import { subBlockPresets } from '../../sub-blocks/sa-templates';
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
