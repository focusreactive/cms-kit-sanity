import { defineComponentType } from '../../sa-config';

import { badgesSecondaryOptions } from '../../ContentComponents/Section/common-schemas';
import {
  ComponentPreview,
  smartLink,
} from '@focus-reactive/cms-kit-sanity/sanity';


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
      initialValue: 'has-secondary-link', //TODO: fix initial value
    }),
    df({
      name: 'secondaryLink',
      type: smartLink.name,
      // @ts-ignore
      hidden: ({ parent }) => parent?.secondary === 'without-secondary',
    }),
  ],
  components: { preview: ComponentPreview },
  preview: {
    // @ts-ignore
    prepare({ customTitle }) {
      return {
        title: customTitle || 'Badge',
        type: 'tw-base.badges',
      };
    },
  },
}));

export default [badges];
