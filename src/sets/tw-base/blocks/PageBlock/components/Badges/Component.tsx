import React from 'react';

import { getCmsKey, withCMS, AdapterFn } from '@focus-reactive/cms-kit-sanity';
import type { SmartLinkProps } from '@focus-reactive/cms-kit-sanity/sanity';
import { classnames } from '@focus-reactive/cms-kit-sanity/common';

type Props = {
  primaryText: string;
  primaryLink: SmartLinkProps;
  secondaryLink?: SmartLinkProps;
  isDarkTheme: boolean;
};

function Badges(props: Props) {
  const { primaryLink, secondaryLink, primaryText, isDarkTheme } = props;

  return (
    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
      <div
        className={classnames(
          'relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20',
          { 'ring-white/10 hover:ring-white/20': isDarkTheme },
        )}
      >
        {primaryText}{' '}
        <a
          href={primaryLink.href}
          className={classnames('font-semibold text-indigo-600', {
            'text-white': isDarkTheme,
          })}
        >
          <span className="absolute inset-0" aria-hidden="true"></span>
          {primaryLink.text} <span aria-hidden="true">&rarr;</span>
        </a>
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

export default withCMS({ sa, sb })(Badges);
