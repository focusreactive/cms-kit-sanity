import { defineComponentType } from '@ns/sa-config';

import { buttonsSecondaryOptions } from '@/sanity/common-schema';
import smartLink from '@/sanity/common/SmartLink/sa-schema';
import { ComponentPreview } from '@/sanity/model/components';

export const buttons = defineComponentType(({ df }) => ({
  name: 'buttons',
  type: 'object',
  title: 'Buttons',
  fields: [
    df({
      name: 'customTitle',
      type: 'string',
    }),
    df({ name: 'primaryLink', type: smartLink.name }),
    df({
      name: 'secondary',
      type: 'string',
      options: {
        list: buttonsSecondaryOptions,
        layout: 'radio',
        direction: 'vertical',
      },
      invitialValue: 'has-secondary-link', //TODO: fix initial value
    }),
    df({
      name: 'secondaryLink',
      type: smartLink.name,
      hidden: ({ parent }) => parent?.secondary === 'without-secondary',
    }),
  ],
  components: { preview: ComponentPreview },
  preview: {
    prepare({ customTitle }) {
      return {
        title: customTitle || 'Buttons',
        type: 'base.buttons',
      };
    },
  },
}));

export default [buttons];
