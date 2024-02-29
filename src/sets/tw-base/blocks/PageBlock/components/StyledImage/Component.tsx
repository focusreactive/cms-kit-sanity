import React from 'react';
import type { Image } from '@ns/types/common';

import { getCmsKey, withCMS } from '@/models/withCMS';
import classNames from '@/namespaces/common/classnames';

type Props = {
  isDarkTheme: boolean;
  imageWithMetadata: {
    image: Image;
  };
};

function StyledImage({ imageWithMetadata, isDarkTheme }: Props) {
  return (
    <div className="relative overflow-hidden px-6 pt-16 lg:px-8 ">
      <img
        src={imageWithMetadata.image.src}
        alt={imageWithMetadata.image.alt}
        className="ring-grey-100 mx-auto max-w-full rounded-xl shadow-xl ring-1 ring-gray-900/[.1]"
      />
      <div className="relative" aria-hidden="true">
        <div
          className={classNames(
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

const sa = cmsProps => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
  };
};

const sb = cmsProps => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
  };
};

export default withCMS({ sa, sb })(StyledImage);
