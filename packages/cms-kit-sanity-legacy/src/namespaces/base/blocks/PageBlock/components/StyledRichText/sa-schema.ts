import { defineComponentType } from '@ns/sa-config';

import { componentAlignment, customRichText } from '@/sanity/common-schema';
import { ComponentPreview } from '@/sanity/model/components';

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
    prepare({ customTitle }) {
      return {
        title: customTitle || 'Rich text',
        type: 'base.styledRichText',
      };
    },
  },
}));

export default [styledRichText];
