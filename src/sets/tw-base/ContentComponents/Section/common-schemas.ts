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
    // @ts-ignore
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
