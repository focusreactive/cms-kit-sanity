'use client';
import React from 'react';
import { Image } from '@ns/blocks/PageBlock/components/Image';

import { getCmsKey, withCMS } from '@/models/withCMS';
import { SmartLink } from '@/sanity/common';
import type { SmartLinkProps } from '@/sanity/common/SmartLink/Component';

import type { logoItem } from './sa-schema';

type LogoItem = {
  _key: string;
  _type: typeof logoItem.name;
  link: SmartLinkProps;
  imageWithMetadata: {
    image: {
      src: string;
      width: number;
      height: number;
      alt?: string;
    };
  };
};

type Props = {
  title?: string;
  items: LogoItem[];
};

const LogoItem = (item: LogoItem) => {
  return (
    <div className={'col-span-2 max-h-12 w-full object-contain lg:col-span-1'}>
      <SmartLink {...item.link}>
        {item.imageWithMetadata && (
          <Image
            imageWithMetadata={item.imageWithMetadata}
            isDarkTheme={false}
          />
        )}
      </SmartLink>
    </div>
  );
};

function LogoGrid(props: Props) {
  const { items } = props;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {items.map(item => {
            return <LogoItem {...item} key={getCmsKey(item)} />;
          })}
        </div>
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

export default withCMS({ sa, sb })(LogoGrid);
