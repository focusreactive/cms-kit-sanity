import { defineBlockType, defineUtilityType } from '@ns/sa-config';

import smartLink from '@/sanity/common/SmartLink/sa-schema';
import smartImage from '@/sanity/common/SmartImage/sa-schema';

import saMock from './sa-mock.json';

const headerStat = defineUtilityType(({ df }) => ({
  name: 'header.stat',
  type: 'object',
  title: 'Header stat',
  fields: [
    df({
      name: 'title',
      type: 'string',
    }),
    df({
      name: 'value',
      type: 'string',
    }),
  ],
}));

const header = defineBlockType(({ df }) => ({
  name: 'header',
  type: 'object',
  title: 'Header',
  fields: [
    df({
      name: 'header',
      type: 'string',
    }),
    df({
      name: 'text',
      type: 'string',
    }),
    df({
      name: 'isIncludeBackgroundImage',
      type: 'boolean',
      title: 'Add Background Image',
    }),
    df({
      name: 'backgroundImage',
      type: smartImage.name,
      hidden: ({ parent }) => !parent?.isIncludeBackgroundImage,
    }),
    df({
      name: 'stats',
      type: 'array',
      of: [{ type: headerStat.name }],
    }),
    df({
      name: 'links',
      type: 'array',
      of: [{ type: smartLink.name }],
    }),
  ],
  initialValue: saMock,
}));

export default [header, headerStat];
