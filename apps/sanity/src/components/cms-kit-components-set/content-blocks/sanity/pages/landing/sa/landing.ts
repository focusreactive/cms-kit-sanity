import { defineField, defineType } from 'sanity';
import { author } from '@/sanity/schemas/author';
import { seo } from './seo';
import { heroFields } from '../../../functional-blocks/SimpleHero/sa-schemas';
import { defineBlocksField } from '@/sanity/plugins/content-blocks/define-blocks-field';
import { contentBlocksSchemas } from '../../../root-blocks/sa-schemas';
import { renderItemView } from '@/sanity/plugins/blocks-preview/render-item-view';
import { contentBlockPresets } from '@/components/cms-kit-components-set/content-blocks/sanity/root-blocks/sa-templates';

const ofTypes = contentBlocksSchemas
  .filter((t) => t.type !== 'array')
  .map((t) => ({ type: t.name }));

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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineBlocksField({
      name: 'content',
      of: ofTypes,
      group: 'contentGroup',
      options: {
        presets: contentBlockPresets,
        renderItemView: renderItemView,
      },
    }),
    ...heroFields,
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
