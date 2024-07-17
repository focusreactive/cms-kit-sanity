import { defineComponentType, defineUtilityType } from '../../sa-config';
import {
  featurePointStyles,
} from '../../ContentComponents/Section/common-schemas';
import {
  ComponentPreview,
  smartLink,
  imageWithMetadata
} from '@focus-reactive/cms-kit-sanity/sanity';

export const featureIcon = defineUtilityType(({ df }) => ({
  name: 'featureIcon',
  type: 'object',
  title: 'Feature Icon',
  fields: [
    df({
      name: 'icon',
      type: imageWithMetadata.name,
    }),
  ],
}));

export const featurePoint = defineUtilityType(({ df }) => ({
  name: 'keyPoint',
  type: 'object',
  title: 'Key Point',
  fields: [
    df({ name: 'title', type: 'string' }),
    df({ name: 'description', type: 'string' }),
    df({ name: 'link', type: smartLink.name }),
    df({
      name: 'icon',
      type: featureIcon.name,
    }),
  ],
}));

export const featurePoints = defineComponentType(({ df }) => ({
  name: 'featurePoints',
  type: 'object',
  title: 'Feature Points',
  fields: [
    df({
      name: 'customTitle',
      type: 'string',
    }),
    df({
      name: 'columns',
      type: 'number',
      options: {
        list: [1, 2, 3],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    df({
      name: 'style',
      type: 'string',
      options: {
        list: featurePointStyles,
        layout: 'dropdown',
      },
    }),
    df({
      name: 'features',
      type: 'array',
      of: [df({ name: featurePoint.name, type: featurePoint.name })],
    }),
  ],
  components: { preview: ComponentPreview },
  preview: {
    // @ts-ignore
    prepare({ customTitle }) {
      return {
        title: customTitle || 'Feature points',
        type: 'tw-base.featurePoints',
      };
    },
  },
}));

export default [featurePoints, featurePoint, featureIcon];
