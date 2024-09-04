import Image from 'next/image';
import React from 'react';
import imageUrlBuilder from '@sanity/image-url';

import { getCmsKey, withCMS } from '@/models/withCMS';
import { getExternalDatasetConfig } from '@/sanity/initExternalDataset';

export interface SmartImageProps {
  asset?: { _ref: string };
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  quality?: number;
  className?: string;
}

function urlFor({ source }: { source: string }) {
  const data = getExternalDatasetConfig();

  return imageUrlBuilder({
    projectId: 'k0c6krxi',
    dataset: 'production',
  }).image(source);
}

function resolveInternalImageUrl({ ref }: { ref: string }) {
  if (!ref) {
    return '';
  }

  return urlFor({ source: ref }).url();
}

const SmartImage: React.FC<SmartImageProps> = ({
  asset,
  alt,
  title,
  width = 1000,
  height = 300,
  priority,
  placeholder,
  quality,
  className,
}) => {
  const imageUrl = resolveInternalImageUrl({
    ref: asset?._ref,
  });

  return (
    <Image
      src={imageUrl}
      alt={alt}
      title={title}
      width={width}
      height={height}
      priority={priority}
      placeholder={placeholder}
      quality={quality}
      className={className}
    />
  );
};

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

export default withCMS({ sa, sb })(SmartImage);
