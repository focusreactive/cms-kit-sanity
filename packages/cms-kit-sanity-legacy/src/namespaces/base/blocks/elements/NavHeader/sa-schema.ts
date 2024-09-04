import { defineBlockType, defineUtilityType } from '@ns/sa-config';

import saMock from './sa-mock.json';

const submenuItem = defineUtilityType(({ df }) => ({
  name: 'submenuItem',
  type: 'object',
  title: 'Submenu Item',
  fields: [
    df({ name: 'title', type: 'string' }),
    df({ name: 'text', type: 'text' }),
    df({ name: 'href', type: 'url' }),
    df({ name: 'icon', type: 'string' }), // или используйте тип 'image', если иконка - изображение
  ],
}));

const menuItem = defineUtilityType(({ df }) => ({
  name: 'menuItem',
  type: 'object',
  title: 'Menu Item',
  fields: [
    df({ name: 'label', type: 'string' }),
    df({ name: 'icon', type: 'string' }), // или используйте тип 'image', если иконка - изображение
    df({
      name: 'submenu',
      type: 'object',
      fields: [
        df({
          name: 'items',
          type: 'array',
          of: [{ type: submenuItem.name }],
        }),
        df({
          name: 'footerItems',
          type: 'array',
          of: [{ type: submenuItem.name }],
        }),
      ],
    }),
  ],
}));

const navHeader = defineBlockType(({ df }) => ({
  name: 'navHeader',
  type: 'object',
  title: 'Header with nav menu',
  fields: [
    df({
      name: 'menuItems',
      type: 'array',
      of: [{ type: menuItem.name }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Header with navigation',
        type: 'base.navHeader',
      };
    },
  },
  initialValue: saMock,
}));

export default [navHeader, menuItem, submenuItem];
