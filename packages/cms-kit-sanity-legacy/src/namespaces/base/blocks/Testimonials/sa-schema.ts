import {
  defineBlockType,
  defineUtilityType,
} from '@ns/sa-config';

import saMock from './sa-mock.json';

const person = defineUtilityType(({ df }) => ({
  name: 'testimonials.person',
  type: 'object',
  title: 'Stats Point',
  fields: [
    df({
      name: 'name',
      type: 'string',
    }),
    df({
      name: 'avatar',
      type: 'string',
    }),
    df({
      name: 'role',
      type: 'string',
    }),
  ],
}));

const testimonials = defineBlockType(({ df }) => ({
  name: 'testimonials',
  type: 'object',
  title: 'Testimonials',
  fields: [
    df({
      name: 'text',
      type: 'string',
    }),
    df({
      name: 'person',
      type: person.name,
    }),
  ],
  initialValue: saMock,
}));

export default [testimonials, person];
