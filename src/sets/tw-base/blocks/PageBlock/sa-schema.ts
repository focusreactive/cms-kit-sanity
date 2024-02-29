import { defineBlockType, defineUtilityType } from '@ns/sa-config';

import TemplateSelector from '@/sanity/plugin/TemplateSelector';
import {
  backgroundColors,
  backgroundPatterns,
  imageWithMetadata,
  layoutSecondaryOptions,
  layoutSecondarySize,
} from '@/sanity/common-schema';
import { BlockPreview } from '@/sanity/model/components';

import { blogSection } from './components/BlogSection/sa-schema';
import blogSectionSchema from './components/BlogSection/sa-schema';
import { logoCloudGrid } from './components/LogoCloud/sa-schema';
import { grid } from './components/Grid/sa-schema';
import { styledImage } from './components/StyledImage/sa-schema';
import { featurePoints } from './components/FeaturePoints/sa-schema';
import { styledRichText } from './components/StyledRichText/sa-schema';
import { buttons } from './components/Buttons/sa-schema';
import { badges } from './components/Badges/sa-schema';
import logoCloudGridSchema from './components/LogoCloud/sa-schema';
import gridSchema from './components/Grid/sa-schema';
import styledImageSchema from './components/StyledImage/sa-schema';
import featurePointsSchema from './components/FeaturePoints/sa-schema';
import styledRichTextSchema from './components/StyledRichText/sa-schema';
import buttonsSchema from './components/Buttons/sa-schema';
import badgesSchema from './components/Badges/sa-schema';

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
      hidden: ({ parent }) => parent?.type !== 'color',
    }),
    df({
      name: 'patternSelector',
      type: 'string',
      options: {
        list: backgroundPatterns,
        layout: 'dropdown',
      },
      hidden: ({ parent }) => parent?.type !== 'pattern',
    }),
    df({
      name: 'imageSelector',
      type: imageWithMetadata.name,
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
        df({ type: grid.name, name: grid.name }),
        df({ type: styledImage.name, name: styledImage.name }),
        df({ type: featurePoints.name, name: featurePoints.name }),
        df({ type: styledRichText.name, name: styledRichText.name }),
        df({ type: logoCloudGrid.name, name: logoCloudGrid.name }),
        df({ type: blogSection.name, name: blogSection.name }),
        df({ type: buttons.name, name: buttons.name }),
        df({ type: badges.name, name: badges.name }),
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
  ...logoCloudGridSchema,
  ...gridSchema,
  ...styledImageSchema,
  ...featurePointsSchema,
  ...styledRichTextSchema,
  ...buttonsSchema,
  ...badgesSchema,
  ...blogSectionSchema,
];
