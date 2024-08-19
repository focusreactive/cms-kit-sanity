import React from 'react';

import { classnames } from '@focus-reactive/cms-kit-sanity/common';
import { SmartImage } from '../SmartImage';

type Props = {
  isDarkTheme: boolean;
  imageWithMetadata: {
    imageAsset: { src: string; alt: string; width: string; height: string };
  };
};

function LogoGrid({ imageWithMetadata, isDarkTheme }: Props) {
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

export default LogoGrid;
