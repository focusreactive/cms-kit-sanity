import { defineField, defineType } from 'sanity';
import { author } from './author';
import { seo } from './seo';

export const landing = defineType({
  name: 'landing',
  title: 'Landing',
  type: 'document',
  options: {
    columnTitle: 'Landing Pages',
  },
  groups: [
    {
      name: 'contentGroup',
      title: 'Content',
    },
    {
      name: 'seoGroup',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Metatags',
      type: seo.name,
      group: 'seoGroup',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      type: 'content-blocks',
      group: 'contentGroup',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: author.name },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});

export default [landing];
