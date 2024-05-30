import { getCmsKey, AdapterFn } from '@focus-reactive/cms-kit-sanity';
import { vercelStegaSplit } from '@vercel/stega';

const cleanObject = (obj?: object): object | undefined => {
  if (!obj) {
    return obj;
  }
  const entries = Object.entries(obj);
  const cleanObj: { [key: string]: string } = {};
  entries.forEach(([key, val]) => {
    if (typeof val !== 'string') {
      cleanObj[key] = val;
      return;
    }
    cleanObj[key] = val ? vercelStegaSplit(val).cleaned : val;
  });
  return cleanObj;
};

type BlockOptionsProps = {
  _type: string;
  backgroundOptions?: {
    _type: string;
    type: string;
    colorSelector?: string;
    patternSelector?: string;
    imageSelector?: object;
  };
  layoutOptions?: {
    _type: string;
    secondary: string;
    secondarySize: string;
    secondaryComponent: object;
  };
};
const saBlockOptions = (options: BlockOptionsProps) => {
  const { backgroundOptions, layoutOptions } = options;
  return {
    ...options,
    backgroundOptions: cleanObject(backgroundOptions),
    layoutOptions: cleanObject(layoutOptions),
  };
};

type SaProps = {
  _type: string;
  _id: string;
  blockOptions: BlockOptionsProps;
};

export const sa = (cmsProps: SaProps) => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
    blockOptions: saBlockOptions(cmsProps.blockOptions),
  };
};
