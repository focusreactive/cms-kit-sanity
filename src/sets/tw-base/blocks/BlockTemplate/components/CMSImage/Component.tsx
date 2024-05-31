import React from 'react';
// import { Image } from '@ns/types/common';

import { AdapterFn, getCmsKey, withCMS } from '@focus-reactive/cms-kit-sanity';

type Props = {
  className: string;
  imageWithMetadata: {
    image: { src?: string; alt?: string };
  };
};

function CMSImage({ imageWithMetadata, className, ...rest }: Props) {
  return (
    <img
      src={imageWithMetadata.image?.src}
      alt={imageWithMetadata.image?.alt}
      className={className}
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

export default withCMS({ sa, sb })(CMSImage);
