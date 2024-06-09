import { imageWithMetadata } from '@focus-reactive/cms-kit-sanity/sanity';
import { defineUtilityType } from '../../sa-config';
import {
  backgroundColors,
  backgroundPatterns,
  layoutSecondaryOptions,
  layoutSecondarySize,
} from './common-schemas';
import { styledRichText } from '../../SubBlocks/StyledRichText/sa-schema';

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

export const blockOptions = defineUtilityType(({ df }) => ({
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

export default [
  blockOptions,
  backgroundOptions,
  layoutOptions,
  secondaryComponent,
];
