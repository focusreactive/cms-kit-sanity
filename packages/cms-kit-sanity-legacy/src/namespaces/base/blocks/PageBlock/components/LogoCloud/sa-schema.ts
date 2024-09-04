import { defineComponentType, defineUtilityType } from '@ns/sa-config';

import { imageWithMetadata } from '@/sanity/common-schema';
import smartLink from '@/sanity/common/SmartLink/sa-schema';
import { ComponentPreview } from '@/sanity/model/components';

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
    prepare({ customTitle }) {
      return {
        title: customTitle || 'Logo cloud',
        type: 'base.logoCloudGrid',
      };
    },
  },
}));

export default [logoCloudGrid, logoItem];
