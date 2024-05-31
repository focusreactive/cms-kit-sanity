import { getCmsKey, AdapterFn } from '@focus-reactive/cms-kit-sanity';
import { vercelStegaSplit } from '@vercel/stega';

type SaProps = {
  _type: string;
  _id: string;
};

// @ts-ignore
export const sa: AdapterFn = (cmsProps: SaProps) => {
  const backgroundColor = vercelStegaSplit(
    // @ts-ignore
    cmsProps?.backgroundColor || 'white',
  ).cleaned;
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
    backgroundColor,
  };
};
