import Link from 'next/link';
import type { ReactNode } from 'react';
import React from 'react';
import { useClient } from 'sanity';

import { getCmsKey, withCMS } from '@/models/withCMS';

export interface SmartLinkProps {
  type: 'internal' | 'url';
  href: string;
  text: string;
  asPath?: string;
  locale?: string;
  prefetch?: boolean;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;
  title?: string;
  className: string;
  _key: string;
  children: ReactNode;
}

const LinkComponent: React.FC<SmartLinkProps> = ({
  type,
  href,
  text,
  asPath,
  locale,
  prefetch,
  target,
  rel,
  title,
  className,
  children,
}: SmartLinkProps) => {
  if (type === 'internal') {
    return (
      <Link
        className={className}
        // todo: make rure href is always correct
        href={href || ''}
        as={asPath}
        locale={locale}
        prefetch={prefetch}
        title={title}
      >
        {children || text}
      </Link>
    );
  } else if (type === 'url') {
    return (
      <a
        className={className}
        href={href}
        target={target}
        rel={rel}
        title={title}
      >
        {children || text}
      </a>
    );
  } else {
    return null;
  }
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

export default withCMS({ sa, sb })(LinkComponent);
