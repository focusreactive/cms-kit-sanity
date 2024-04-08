import React from 'react';

import { GenericRichText } from '@focus-reactive/cms-kit-sanity/common';
import { contentPoint } from '@ns/blocks/ContentBlock/sa-schema';
// import { contentPoint } from '@ns/blocks/ContentBlock/sa-schema';


type ContentPointProps = {
  value: {
    description: string;
    name: string;
    icon: {
      src: string;
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
