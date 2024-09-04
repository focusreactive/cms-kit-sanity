import type { ContentBlockData } from '@/sanity/types';

const localStorageClickboardKey = 'cms-kit-clipboard';

export const saveContentBlockToLS = (data: ContentBlockData): void => {
  localStorage.setItem(
    localStorageClickboardKey,
    JSON.stringify({ ...data, _key: undefined }),
  );
};

export const retrieveContentBlockFromLS = (): ContentBlockData | null => {
  const storedData = localStorage.getItem(localStorageClickboardKey);

  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error('Error parsing stored data:', error);

      localStorage.removeItem(localStorageClickboardKey);
    }
  }

  return null;
};
