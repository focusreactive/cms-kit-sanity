import { defineComponentType } from '../../sa-config';

import { customRichText, ComponentPreview } from '@focus-reactive/cms-kit-sanity/sanity';

import { componentAlignment } from '../../ContentComponents/Section/common-schemas';


export const styledRichText = defineComponentType(({ df }) => ({
  name: 'styledRichText',
  type: 'object',
  title: 'Styled RichText',
  fields: [
    df({
      name: 'customTitle',
      type: 'string',
    }),
    df({ name: 'customRichText', type: customRichText.name }),
    df({
      name: 'componentAlignment',
      type: 'string',
      options: {
        list: componentAlignment,
        layout: 'radio',
      },
    }),
  ],
  components: { preview: ComponentPreview },
  preview: {
    // @ts-ignore
    prepare({ customTitle }) {
      return {
        title: customTitle || 'Rich text',
        type: 'tw-base.styledRichText',
      };
    },
  },
}));

export default [styledRichText];
