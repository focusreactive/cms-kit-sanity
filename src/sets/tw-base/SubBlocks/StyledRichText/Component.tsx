import React from 'react';

import type { componentAlignment } from '../../ContentComponents/Section/common-schemas';

import { classnames } from '@focus-reactive/cms-kit-sanity/common';

import { AdapterFn, getCmsKey, withCMS } from '@focus-reactive/cms-kit-sanity';
import { SmartLink, SmartLinkProps, ContentBlockGeneric, ContentTypeName } from '@focus-reactive/cms-kit-sanity/sanity';

import { GenericRichText } from '@focus-reactive/cms-kit-sanity/common';

type Props = {
  customRichText: any[];
  withSecondary: boolean;
  componentAlignment: (typeof componentAlignment)[number];
  isDarkTheme: boolean;
};

function StyledRichText({
  customRichText,
  withSecondary,
  componentAlignment,
  isDarkTheme,
}: Props) {
  const richText = customRichText ?? [];
  const isHero = richText[0]?.style === 'h1';

  return (
    <div
      className={classnames('', {
        'mx-auto max-w-2xl lg:text-center': !withSecondary,
        'lg:mx-0 lg:text-left': componentAlignment === 'left',
        'text-center': isHero,
      })}
    >
      <GenericRichText
        value={customRichText}
        components={{
          block: {
            h1: ({ children }: { children: React.ReactElement }) => (
              <h1
                className={classnames(
                  'text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl',
                  {
                    'text-white': isDarkTheme,
                  },
                )}
              >
                {children}
              </h1>
            ),
            h2: ({ children }: { children: React.ReactElement }) => (
              <h2
                className={classnames(
                  'mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl',
                  {
                    'text-white': isDarkTheme,
                  },
                )}
              >
                {children}
              </h2>
            ),
            h3: ({ children }: { children: React.ReactElement }) => (
              <h3
                className={classnames(
                  'mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl',
                  {
                    'text-white': isDarkTheme,
                  },
                )}
              >
                {children}
              </h3>
            ),
            normal: ({ children }: { children: React.ReactElement }) => (
              <p
                className={classnames('mt-6 text-lg leading-8 text-gray-600', {
                  'text-gray-400': isDarkTheme,
                })}
              >
                {children}
              </p>
            ),
          },
          marks: {
            strong: ({ children }: { children: React.ReactElement }) => (
              <strong
                className={classnames(
                  'text-base font-semibold leading-7 text-indigo-600',
                  { 'text-indigo-400': isDarkTheme },
                )}
              >
                {children}
              </strong>
            ),
          },
        }}
      />
    </div>
  );
}

const sa: AdapterFn = cmsProps => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
  };
};

const sb: AdapterFn = cmsProps => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
  };
};

export default withCMS({ sa, sb })(StyledRichText);
