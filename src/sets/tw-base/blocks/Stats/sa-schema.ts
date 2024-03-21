import { defineBlockType, defineUtilityType } from '../../sa-config';

import saMock from './sa-mock.json';

type DUArgs = {
  df: (props: object) => object;
};

const statsPoints = defineUtilityType(({ df }: DUArgs) => ({
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

export const stats = defineBlockType(({ df }: DUArgs) => ({
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
