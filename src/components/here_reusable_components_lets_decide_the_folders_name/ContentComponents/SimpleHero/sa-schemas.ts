import { defineField } from 'sanity';

export const heroFields = [
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
];
