import React from 'react';

import { withCMS } from '@focus-reactive/cms-kit-sanity';
import Image from 'next/image';
import { sa } from './sa-adapter';
import { SmartImageProps } from './types';

function SmartImage({
  imageWithMetadata,
  className,
  priority,
  ...rest
}: SmartImageProps) {
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

export default withCMS({ sa })(SmartImage);
