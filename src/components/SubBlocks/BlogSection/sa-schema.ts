import {
  defineComponentType,
  defineUtilityType,
} from '../../sa-config';

import {
  customRichText,
  imageWithMetadata,
  smartLink,
  ComponentPreview,
} from '@focus-reactive/cms-kit-sanity/sanity';

const blogTag = defineUtilityType(({ df }) => ({
  name: 'blogSection.post.tag',
  type: 'object',
  title: 'Blog tag',
  fields: [
    df({
      name: 'href',
      type: smartLink.name,
    }),
  ],
}));

const blogAuthor = defineUtilityType(({ df }) => ({
  name: 'blogSection.post.author',
  type: 'object',
  title: 'Blog Author',
  fields: [
    df({
      name: 'name',
      type: 'string',
    }),
    df({
      name: 'avatar',
      type: imageWithMetadata.name,
    }),
    df({
      name: 'link',
      type: smartLink.name,
    }),
    df({
      name: 'role',
      type: 'string',
    }),
  ],
}));

const blogPost = defineUtilityType(({ df }) => ({
  name: 'blogSection.post',
  type: 'object',
  title: 'Blog post',
  fields: [
    df({
      name: 'date',
      type: 'date',
    }),
    df({
      name: 'link',
      type: smartLink.name,
    }),
    df({
      name: 'image',
      type: imageWithMetadata.name,
    }),
    df({
      name: 'text',
      type: customRichText.name,
    }),
    df({
      name: 'authors',
      type: 'array',
      of: [{ type: blogAuthor.name }],
    }),
    df({
      name: 'tags',
      type: 'array',
      of: [{ type: blogTag.name }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Post',
      };
    },
  },
}));

export const blogSection = defineComponentType(({ df }) => ({
  name: 'blogSection',
  type: 'object',
  title: 'Blog section',
  fields: [
    df({
      name: 'customTitle',
      type: 'string',
    }),
    df({
      name: 'style',
      type: 'string',
      options: {
        list: [
          { title: 'Three column', value: 'three-column' },
          {
            title: 'Three column with images',
            value: 'three-column-with-images',
          },
          {
            title: 'Three column with background images',
            value: 'three-column-with-background-images',
          },
        ],
        layout: 'dropdown',
      },
    }),
    df({
      name: 'text',
      type: customRichText.name,
    }),
    df({
      name: 'posts',
      type: 'array',
      of: [{ type: blogPost.name }],
    }),
  ],
  components: { preview: ComponentPreview },
  preview: {
    prepare({ customTitle }: { customTitle: string }) {
      return {
        title: customTitle || 'Blog',
        type: 'tw-base.blogSection',
      };
    },
  },
}));

export default [blogSection, blogPost, blogAuthor, blogTag];
