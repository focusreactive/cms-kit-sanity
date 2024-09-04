import { defineGlobalType } from '@/sanity/model/defineGlobalType';

export const smartImage = defineGlobalType(({ df }) => ({
  name: 'Image',
  type: 'image',
  title: 'Image',
  fields: [
    df({
      name: 'alt',
      type: 'string',
      title: 'Alternative Text',
    }),
    df({
      name: 'advancedSettings',
      type: 'boolean',
      title: 'Advanced Settings',
      description: 'Toggle to show/hide advanced settings',
    }),

    df({
      name: 'width',
      type: 'number',
      title: 'Width',
      hidden: ({ parent }) => !parent || !parent.advancedSettings,
    }),
    df({
      name: 'height',
      type: 'number',
      title: 'Height',
      hidden: ({ parent }) => !parent || !parent.advancedSettings,
    }),
    df({
      name: 'priority',
      type: 'boolean',
      title: 'Priority',
      description:
        'Indicates if the image should be prioritized during loading',
      hidden: ({ parent }) => !parent || !parent.advancedSettings,
    }),
    df({
      name: 'placeholder',
      type: 'string',
      title: 'Placeholder',
      options: {
        list: [
          { title: 'Blur', value: 'blur' },
          { title: 'Empty', value: 'empty' },
        ],
      },
      hidden: ({ parent }) => !parent || !parent.advancedSettings,
    }),
    df({
      name: 'quality',
      type: 'number',
      title: 'Quality',
      hidden: ({ parent }) => !parent || !parent.advancedSettings,
    }),
  ],
}));

export default smartImage;
