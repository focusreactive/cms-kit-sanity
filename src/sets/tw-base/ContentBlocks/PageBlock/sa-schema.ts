import {
  TemplateSelector,
  BlockPreview,
  imageWithMetadata,
} from '@focus-reactive/cms-kit-sanity/sanity';
import {
  backgroundColors,
  backgroundPatterns,
  layoutSecondaryOptions,
  layoutSecondarySize,
} from '../../common/common-schema';

import { blogSection } from '../../SubBlocks/BlogSection/sa-schema';
import { logoCloudGrid } from '../../SubBlocks/LogoCloud/sa-schema';
import { grid } from '../../SubBlocks/Grid/sa-schema';
import { styledImage } from '../../SubBlocks/StyledImage/sa-schema';
import { featurePoints } from '../../SubBlocks/FeaturePoints/sa-schema';
import { styledRichText } from '../../SubBlocks/StyledRichText/sa-schema';
import { buttons } from '../../SubBlocks/Buttons/sa-schema';
import { badges } from '../../SubBlocks/Badges/sa-schema';
import { defineBlockType, defineUtilityType } from '../../sa-config';

export const backgroundOptions = defineUtilityType(({ df }) => ({
  name: 'backgroundOptions',
  title: 'Background Options',
  type: 'object',
  fields: [
    df({
      name: 'type',
      type: 'string',
      options: {
        list: ['color', 'pattern', 'image'],
        layout: 'radio',
        direction: 'vertical',
      },
    }),
    df({
      name: 'colorSelector',
      type: 'string',
      options: {
        list: backgroundColors,
        layout: 'dropdown',
      },
      // @ts-ignore
      hidden: ({ parent }) => parent?.type !== 'color',
    }),
    df({
      name: 'patternSelector',
      type: 'string',
      options: {
        list: backgroundPatterns,
        layout: 'dropdown',
      },
      // @ts-ignore
      hidden: ({ parent }) => parent?.type !== 'pattern',
    }),
    df({
      name: 'imageSelector',
      type: imageWithMetadata.name,
      // @ts-ignore
      hidden: ({ parent }) => parent?.secondary === 'image',
    }),
  ],
}));

export const secondaryComponent = defineUtilityType(({ df }) => ({
  name: 'secondaryComponent',
  title: 'Secondary Component',
  type: 'array',
  of: [
    df({
      name: 'secondaryImage',
      type: imageWithMetadata.name,
    }),
    df({
      name: 'secondaryRichText',
      type: styledRichText.name,
    }),
  ],
}));

export const layoutOptions = defineUtilityType(({ df }) => ({
  name: 'layoutOptions',
  title: 'Layout Options',
  type: 'object',
  fields: [
    df({
      name: 'secondary',
      type: 'string',
      options: {
        list: layoutSecondaryOptions,
        layout: 'radio',
        direction: 'vertical',
      },
    }),
    df({
      name: 'secondarySize',
      type: 'string',
      options: {
        list: layoutSecondarySize,
        layout: 'radio',
        direction: 'vertical',
      },
    }),
    df({
      name: 'secondaryComponent',
      type: secondaryComponent.name,
      // @ts-ignore
      hidden: ({ parent }) => parent?.secondary === 'without-secondary',
    }),
  ],
}));

const blockOptions = defineUtilityType(({ df }) => ({
  name: 'blockOptions',
  title: 'Block Options',
  type: 'object',
  fields: [
    df({
      name: 'backgroundOptions',
      type: backgroundOptions.name,
    }),
    df({
      name: 'layoutOptions',
      type: layoutOptions.name,
    }),
  ],
}));

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

export default [
  pageBlock,
  blockOptions,
  backgroundOptions,
  layoutOptions,
  secondaryComponent,
];
