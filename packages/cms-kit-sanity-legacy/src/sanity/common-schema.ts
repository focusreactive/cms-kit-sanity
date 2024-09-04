import { ImageIcon } from '@sanity/icons';

import smartLink from './common/SmartLink/sa-schema';
import smartImage from './common/SmartImage/sa-schema';
import { ImageInput } from './model/components';
import { defineGlobalType } from './model/defineGlobalType';

export const imageWithAlt = defineGlobalType(({ df }) => ({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  fields: [
    df({
      title: 'Alternative Text',
      name: 'alt',
      type: 'string',
    }),
  ],
}));

export const keyPoint = defineGlobalType(({ df }) => ({
  name: 'keyPoint',
  type: 'object',
  title: 'Key Point',
  fields: [
    df({
      name: 'name',
      type: 'string',
    }),
    df({
      name: 'description',
      type: 'string',
    }),
    df({
      name: 'icon',
      type: imageWithAlt.name,
    }),
  ],
}));

export const templateView = defineGlobalType(() => ({
  name: 'templateView',
  type: 'string',
  components: {
    // Note: the following component will be attached in the ./plugin/index.ts
    // field: TemplateView,
  },
  options: {},
}));

export const imageWithMetadata = defineGlobalType(({ df }) => ({
  name: 'imageWithMetadata',
  type: 'image',
  title: 'Image',
  description: `Please add the metadata you want to use in the frontend.`,
  icon: ImageIcon,
  options: {
    hotspot: true,
    metadata: ['blurhash', 'lqip', 'palette'],
    requiredFields: [],
  },
  components: {
    input: ImageInput,
  },
  preview: {
    prepare() {
      return {
        title: 'Image',
        // TODO: check why it's not global type
        type: 'tw-base.imageWithMetadata',
      };
    },
  },
}));

export const customRichText = defineGlobalType(({ df }) => ({
  name: 'customRichText',
  title: 'Custom Rich Text',
  type: 'array',
  of: [
    df({
      type: 'block',
    }),
  ],
}));

export const backgroundColors = [
  { title: 'light', value: 'bg-white' },
  { title: 'light-grey', value: 'bg-gray-100' },
  { title: 'dark', value: 'bg-[#111827]' },
];

export const layoutSecondaryOptions = [
  { title: 'Has secondary on the right', value: 'has-secondary-on-the-right' },
  { title: 'Has secondary on the left', value: 'has-secondary-on-the-left' },
  { title: 'Without secondary', value: 'without-secondary' },
];

export const layoutSecondarySize = ['33%', '50%'];

export const featurePointStyles = [
  { title: 'Icon on the left', value: 'icon-left' },
  {
    title: 'Icon with background on the left',
    value: 'icon-left-with-background',
  },
  { title: 'Icon and title on the same line', value: 'icon-title-inline' },
  { title: 'Icon on the top', value: 'icon-top' },
  { title: 'No icon', value: 'no-icon' },
  {
    title: 'Icon on the left, separate title',
    value: 'icon-left-separate-title',
  },
];

export const componentAlignment = ['left', 'center'];

export const findBlock = (key: string, document: any) => {
  const index = document?.content?.findIndex(
    block => block?.components?.some(component => component._key === key),
  );

  return document?.content[index];
};

export const backgroundPatterns = ['pink'];

export const buttonsSecondaryOptions = [
  'has-secondary-link',
  'without-secondary',
];

export const badgesSecondaryOptions = [
  'has-secondary-link',
  'without-secondary',
];

export default [
  imageWithAlt,
  keyPoint,
  imageWithMetadata,
  customRichText,
  smartImage,
  smartLink,
];
