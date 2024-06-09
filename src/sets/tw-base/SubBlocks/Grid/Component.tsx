import React from 'react';
import { SmartImage } from '../../ContentComponents/SmartImage';

import { AdapterFn, getCmsKey, withCMS } from '@focus-reactive/cms-kit-sanity';
import { GenericRichText } from '@focus-reactive/cms-kit-sanity/common';

import type { gridCard } from './sa-schema';

type GridCard = {
  customRichText: [];
  smartLink: string;
  _key: string;
  imageWithMetadata: {
    image: {
      src: string;
      width: number;
      height: number;
      alt?: string;
    };
  };
  _type: typeof gridCard.name;
};

export type GridElement = GridCard;

type Props = {
  title?: string;
  items: GridElement[];
};

const Card = ({ item }: { item: GridElement }) => {
  return (
    <>
      {item.imageWithMetadata && (
        <div className="sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64">
          <SmartImage
            imageWithMetadata={item.imageWithMetadata}
            className="h-full w-full object-cover object-center"
          />
        </div>
      )}
      <GenericRichText
        value={item.customRichText}
        components={{
          block: {
            h3: ({ children }: { children: React.ReactElement }) => (
              <h3 className="mt-6 text-sm text-gray-500">{children}</h3>
            ),
            normal: ({ children }: { children: React.ReactElement }) => (
              <p className="text-base font-semibold text-gray-900">
                {children}
              </p>
            ),
          },
        }}
      />
    </>
  );
};

function Grid(props: Props) {
  const { title, items } = props;

  return (
    <div className="mx-auto">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

      <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
        {items.map((item) => (
          <div className="group relative" key={getCmsKey(item)}>
            {item.smartLink ? (
              <a href={item.smartLink}>
                <Card item={item} />
              </a>
            ) : (
              <Card item={item} />
            )}
          </div>
        ))}
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

export default withCMS({ sa, sb })(Grid);
