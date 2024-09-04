import React from 'react';

import type { IHeroProps } from './types';

export default function Hero(props: IHeroProps) {
  return (
    <div className="overflow-hidden bg-white" {...(props.containerProps || {})}>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {props.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {props.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
