import { CMSNames, type CurrentCMS } from '@/types/cms';

export const AvailableCMS = {
  [CMSNames.sa]: {
    name: CMSNames.sa,
    title: 'Sanity',
  },
  [CMSNames.sb]: {
    name: CMSNames.sb,
    title: 'Storyblok',
  },
  [CMSNames.na]: {
    name: CMSNames.na,
    title: 'N/A',
  },
};

let currentCMS = AvailableCMS[CMSNames.sa];

export const getCurrentCMS = (): CurrentCMS => {
  if (!currentCMS) {
    throw new Error('use setCurrentCMS to specify CMS you need');
  }

  return currentCMS;
};

export const setCurrentCMS = (name: CMSNames): CurrentCMS => {
  currentCMS = AvailableCMS[name];

  return currentCMS;
};
