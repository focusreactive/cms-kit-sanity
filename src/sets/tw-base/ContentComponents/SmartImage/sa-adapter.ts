
import { AdapterFn, getCmsKey } from '@focus-reactive/cms-kit-sanity';

export const sa: AdapterFn = (cmsProps) => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
  };
};
