import { defineGlobalType } from '@/sanity/model/defineGlobalType';

export const smartLink = defineGlobalType(({ df }) => ({
  name: 'SmartLink',
  type: 'object',
  title: 'Link',
  initialValue: {
    type: 'internal',
  },
  fields: [
    df({
      name: 'type',
      type: 'string',
      title: 'Link Type',
      options: {
        list: [
          { title: 'URL', value: 'url' },
          { title: 'Internal', value: 'internal' },
        ],
      },
    }),
    df({
      name: 'text',
      type: 'string',
      title: 'Link Text',
    }),
    df({
      name: 'href',
      type: 'string',
      title: 'Href',
      hidden: ({ parent }) => parent?.type === 'internal',
    }),
    df({
      name: 'target',
      type: 'string',
      title: 'Target',
      hidden: ({ parent }) => parent?.type === 'internal',
      options: {
        list: [
          { title: 'Self', value: '_self' },
          { title: 'Blank', value: '_blank' },
          { title: 'Parent', value: '_parent' },
          { title: 'Top', value: '_top' },
        ],
      },
    }),

    df({
      name: 'prefetch',
      type: 'boolean',
      title: 'Prefetch',
      hidden: ({ parent }) => parent?.type === 'url',
      description: 'Indicates if Next.js should prefetch the page',
    }),
  ],
}));

export default smartLink;
