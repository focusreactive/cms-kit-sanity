import { defineComponentType } from '../../sa-config';
import { buttonsSecondaryOptions } from '../../ContentComponents/Section/common-schemas';
import {
  ComponentPreview,
  smartLink,
} from '@focus-reactive/cms-kit-sanity/sanity';

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
      // @ts-ignore
      hidden: ({ parent }) => parent?.secondary === 'without-secondary',
    }),
  ],
  components: { preview: ComponentPreview },
  preview: {
    // @ts-ignore
    prepare({ customTitle }) {
      return {
        title: customTitle || 'Buttons',
        type: 'tw-base.buttons',
      };
    },
  },
}));

export default [buttons];
