import React from 'react';
import { contentPoint } from '@ns/blocks/Content/sa-schema';

import { GenericRichText } from '@/sanity/common-components';


type ContentPointProps = {
  value: {
    description: string;
    name: string;
    icon: {
      src;
    } | null;
  };
};

const ContentPoint = ({ value }: ContentPointProps) => {
  return (
    <li className="flex gap-x-3">
      <img
        src={value.icon?.src}
        className="mt-1 h-5 w-5 flex-none text-indigo-600"
        aria-hidden="true"
        // TODO: add alt
        alt={''}
      />
      <span>
        <strong className="font-semibold text-gray-900">{value.name}</strong>{' '}
        {value.description}
      </span>
    </li>
  );
};

const components = {
  types: {
    [contentPoint.name]: ContentPoint,
    // TODO this is for compatibility! Remove later
    // 'ft.contentPoint': ContentPoint,
  },
};
export const RichText = ({ value }: ContentPointProps) => {
  return <GenericRichText value={value} components={components} />;
};
