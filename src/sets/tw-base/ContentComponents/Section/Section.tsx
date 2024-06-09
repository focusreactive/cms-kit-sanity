import React, { Children } from 'react';
import type { ReactNode } from 'react';
import { classnames } from '@focus-reactive/cms-kit-sanity/common';
import {
  backgroundPatterns,
  layoutSecondarySize,
  layoutSecondaryOptions,
  backgroundColors,
} from '@focus-reactive/cms-kit-sanity/sanity';

import { SmartImage } from '../SmartImage';
import type { grid } from '../../SubBlocks/Grid/sa-schema';
import type { GridElement } from '../../SubBlocks/Grid/Component';
import { StyledRichText } from '../../SubBlocks/StyledRichText';

const colors = backgroundColors.map((color) => color.value);
const secondary = layoutSecondaryOptions.map((option) => option.value);

export const isDarkColor = (selectedColor: string) => {
  const index = backgroundColors.findIndex((color) => color.title === 'dark');

  return selectedColor === backgroundColors[index].value;
};

export type BackgroundOptions = {
  colorSelector: (typeof colors)[number];
  patternSelector: (typeof backgroundPatterns)[number];
  imageSelector: { image: typeof Image };
  type: 'color' | 'pattern' | 'image';
};

export type BasicComponent = {
  _type: string;
  _key: string;
};

export type GridComponent = BasicComponent & {
  _type: typeof grid.name;
  title?: string;
  items: GridElement[];
};

export type GenericComponent = GridComponent;

export type LayoutOptions = {
  secondary: (typeof secondary)[number];
  secondarySize: (typeof layoutSecondarySize)[number];
  secondaryComponent?:
    | {
        image: typeof Image;
        _type: 'secondaryImage';
      }[]
    | { _type: 'secondaryRichText'; customRichText: [] }[];
};

export const BackgroundSelector = ({
  backgroundOptions,
}: {
  backgroundOptions: BackgroundOptions;
}) => {
  if (backgroundOptions?.type === 'image') {
    const image = backgroundOptions.imageSelector.image;

    return (
      <div className="absolute inset-0 -z-10 h-full w-full max-w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={classnames('object-cover w-full h-full')}
          // @ts-ignore
          src={image.src}
          // @ts-ignore
          alt={image.alt}
        />
      </div>
    );
  }

  if (backgroundOptions.type === 'color') {
    const backgroundColor = backgroundOptions.colorSelector;

    return (
      <div
        className={classnames(
          'absolute inset-0 -z-10 h-full w-full max-w-full',
          backgroundColor, // TODO: make static selector
        )}
      />
    );
  }

  if (backgroundOptions.type === 'pattern') {
    switch (backgroundOptions.patternSelector) {
      case 'pink':
        return (
          <div>
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
          </div>
        );
    }
  }
};

export const MainContainerSelector = ({
  children,
  layoutOptions,
}: {
  children: ReactNode;
  layoutOptions: LayoutOptions;
}) => {
  const secondary = layoutOptions?.secondaryComponent
    ? layoutOptions.secondaryComponent[0]
    : null;

  if (layoutOptions?.secondary === 'has-secondary-on-the-left') {
    return (
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={classnames(
              'mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2',
              {
                'lg:grid-cols-[1fr,2fr]': layoutOptions.secondarySize === '33%',
              },
            )}
          >
            <div className="lg:ml-auto lg:pl-8 lg:pt-4">{children}</div>
            <div className="order-[-1] flex items-start justify-end">
              {secondary?._type === 'secondaryImage' ? (
                <SmartImage
                  imageWithMetadata={secondary}
                  className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                />
              ) : (
                <StyledRichText {...secondary} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layoutOptions?.secondary === 'has-secondary-on-the-right') {
    return (
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={classnames(
              'mx-auto grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2',
              {
                'lg:grid-cols-[1fr,2fr]': layoutOptions.secondarySize === '33%',
              },
            )}
          >
            <div className="lg:pr-8 lg:pt-4">{children}</div>
            {secondary?._type === 'secondaryImage' ? (
              <SmartImage
                imageWithMetadata={secondary}
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              />
            ) : (
              <StyledRichText {...secondary} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
        {children}
      </div>
    </div>
  );
};

export type SectionProps = React.PropsWithChildren<{
  backgroundOptions: BackgroundOptions;
  layoutOptions: LayoutOptions;
}>;

export const Section = ({
  children,
  backgroundOptions,
  layoutOptions,
}: SectionProps) => {
  return (
    <section className="relative">
      <BackgroundSelector backgroundOptions={backgroundOptions} />
      <MainContainerSelector layoutOptions={layoutOptions}>
        {children}
      </MainContainerSelector>
    </section>
  );
};
