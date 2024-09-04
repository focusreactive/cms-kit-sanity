import React from 'react';
import { Image } from '@ns/types/common';

import { getCmsKey, withCMS } from '@/models/withCMS';

type Props = {
  className: string;
  imageWithMetadata: {
    image: Image;
  };
};

function Image({ imageWithMetadata, className, ...rest }: Props) {
  return (
    <img
      src={imageWithMetadata.image?.src}
      alt={imageWithMetadata.image?.alt}
      className={className}
      {...rest}
    />
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

export default withCMS({ sa, sb })(Image);
