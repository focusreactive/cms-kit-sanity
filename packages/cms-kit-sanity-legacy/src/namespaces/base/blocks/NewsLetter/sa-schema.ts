import {
  defineBlockType,
  defineUtilityType,
} from '@ns/sa-config';

import saMock from './sa-mock.json';

const newsLetterPoints = defineUtilityType(({ df }) => ({
  name: 'newsLetter.point',
  type: 'object',
  title: 'Newsletters point',
  fields: [
    df({
      name: 'icon',
      type: 'string',
    }),
    df({
      name: 'title',
      type: 'string',
    }),
    df({
      name: 'text',
      type: 'string',
    }),
  ],
}));

const newsLetter = defineBlockType(({ df }) => ({
  name: 'newsLetter',
  type: 'object',
  title: 'News Letter',
  fields: [
    df({
      name: 'title',
      type: 'string',
    }),
    df({
      name: 'points',
      type: 'array',
      of: [{ type: newsLetterPoints.name }],
    }),
  ],
  initialValue: saMock,
}));

export default [newsLetter, newsLetterPoints];
