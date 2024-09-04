import { defineComponentType } from '@ns/sa-config';

import { badgesSecondaryOptions } from '@/sanity/common-schema';
import smartLink from '@/sanity/common/SmartLink/sa-schema';
import { ComponentPreview } from '@/sanity/model/components';

export const badges = defineComponentType(({ df }) => ({
  name: 'badges',
  type: 'object',
  title: 'Badges',
  fields: [
    df({
      name: 'customTitle',
      type: 'string',
    }),
    df({ name: 'primaryText', type: 'string' }),
    df({ name: 'primaryLink', type: smartLink.name }),
    df({
      name: 'secondary',
      type: 'string',
      options: {
        list: badgesSecondaryOptions,
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
        title: customTitle || 'Badge',
        type: 'base.badges',
      };
    },
  },
}));

export default [badges];
