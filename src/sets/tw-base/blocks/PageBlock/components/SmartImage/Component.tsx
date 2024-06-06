import React from 'react';
// import { Image } from '@ns/types/common';

import { AdapterFn, getCmsKey, withCMS } from '@focus-reactive/cms-kit-sanity';
import Image from 'next/image';

type Props = {
  className: string;
  imageWithMetadata: {
    imageAsset: { src: string; alt: string; width: string; height: string };
  };
  priority: boolean;
};

function SmartImage({
  imageWithMetadata,
  className,
  priority,
  ...rest
}: Props) {
  const { src, alt, width, height } = imageWithMetadata?.imageAsset || {
    width: '100',
    height: '100',
  };
  const widthNumber = parseInt(width, 10) || 100;
  const heightNumber = parseInt(height, 10) || 100;

  return (
    <Image
      src={src}
      alt={alt || 'untitled'}
      width={widthNumber}
      height={heightNumber}
      className={className}
      priority={priority || false}
      {...rest}
    />
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

export default withCMS({ sa, sb })(SmartImage);
