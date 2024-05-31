import { getCmsKey, AdapterFn } from '@focus-reactive/cms-kit-sanity';

export const sb: AdapterFn = (cmsProps) => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
  };
};
