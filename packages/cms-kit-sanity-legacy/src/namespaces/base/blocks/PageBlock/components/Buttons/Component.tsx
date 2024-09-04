import React from 'react';

import { getCmsKey, withCMS } from '@/models/withCMS';
import type { SmartLinkProps } from '@/sanity/common/SmartLink/Component';
import classNames from '@/namespaces/common/classnames';

type Props = {
  primaryLink: SmartLinkProps;
  secondaryLink?: SmartLinkProps;
  isDarkTheme: boolean;
};

function Buttons(props: Props) {
  const { primaryLink, secondaryLink, isDarkTheme } = props;

  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <a
        href={primaryLink.href}
        className={classNames(
          'rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
          { 'text-white bg-indigo-400 hover:bg-indigo-300': isDarkTheme },
        )}
      >
        {primaryLink.text}
      </a>
      <a
        href={secondaryLink.href}
        className={classNames('text-sm font-semibold leading-6 text-gray-900', {
          'text-white': isDarkTheme,
        })}
      >
        {secondaryLink?.text} <span aria-hidden="true">→</span>
      </a>
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

export default withCMS({ sa, sb })(Buttons);
