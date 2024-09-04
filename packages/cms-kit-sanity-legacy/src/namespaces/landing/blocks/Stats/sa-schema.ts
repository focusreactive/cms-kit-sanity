import { defineBlockType, defineUtilityType } from '@ns/sa-config';

import saMock from './sa-mock.json';

const statsPoints = defineUtilityType(({ df }) => ({
  name: 'stats.points',
  type: 'object',
  title: 'Stats Point',
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

export const stats = defineBlockType(({ df }) => ({
  name: 'stats',
  type: 'object',
  title: 'Stats',
  fields: [
    df({
      name: 'title',
      type: 'string',
    }),
    df({
      name: 'stats',
      type: 'array',
      of: [{ type: statsPoints.name }],
    }),
  ],
  initialValue: saMock,
}));

export default [stats, statsPoints];
