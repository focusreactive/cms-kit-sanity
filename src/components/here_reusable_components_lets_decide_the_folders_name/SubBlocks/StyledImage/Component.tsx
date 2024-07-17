import React from 'react';

import { AdapterFn, getCmsKey, withCMS } from '@focus-reactive/cms-kit-sanity';
import { classnames } from '@focus-reactive/cms-kit-sanity/common';
import { SmartImage } from '../../ContentComponents/SmartImage';

type Props = {
  isDarkTheme: boolean;
  imageWithMetadata: {
    imageAsset: { src: string; alt: string; width: string; height: string };
  };
};

function StyledImage({ imageWithMetadata, isDarkTheme }: Props) {
  return (
    <div className="relative overflow-hidden px-6 pt-16 lg:px-8 ">
      <SmartImage
        imageWithMetadata={imageWithMetadata}
        className="ring-grey-100 mx-auto max-w-full rounded-xl shadow-xl ring-1 ring-gray-900/[.1]"
      />
      <div className="relative" aria-hidden="true">
        <div
          className={classnames(
            'absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white to-white/0 pt-[7%]',
            {
              'from-[#111827]': isDarkTheme,
            },
          )}
        />
      </div>
    </div>
  );
}

const sa: AdapterFn = (cmsProps) => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
  };
};

const sb: AdapterFn = (cmsProps) => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
  };
};

export default withCMS({ sa, sb })(StyledImage);
