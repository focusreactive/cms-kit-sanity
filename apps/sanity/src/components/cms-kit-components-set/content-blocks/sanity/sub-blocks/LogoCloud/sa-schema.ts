import { defineComponentType, defineUtilityType } from '../../sa-config';

import {
  imageWithMetadata,
  smartLink,
  ComponentPreview,
} from '@focus-reactive/cms-kit-sanity/sanity';

export const logoItem = defineUtilityType(({ df }) => ({
  name: 'logoItem',
  type: 'object',
  title: 'Logo Item',
  fields: [
    df({
      name: 'imageWithMetadata',
      type: imageWithMetadata.name,
    }),
    df({
      name: 'link',
      type: smartLink.name,
    }),
  ],
}));

export const logoCloudGrid = defineComponentType(({ df }) => ({
  name: 'logoCloudGrid',
  type: 'object',
  title: 'Logo cloud Grid',
  fields: [
    df({
      name: 'customTitle',
      type: 'string',
    }),
    df({
      name: 'items',
      type: 'array',
      of: [df({ name: 'logoItem', type: logoItem.name })],
    }),
  ],
  components: { preview: ComponentPreview },
  preview: {
    // @ts-ignore
    prepare({ customTitle }) {
      return {
        title: customTitle || 'Logo cloud',
        type: 'tw-base.logoCloudGrid',
      };
    },
  },
}));

export default [logoCloudGrid, logoItem];
