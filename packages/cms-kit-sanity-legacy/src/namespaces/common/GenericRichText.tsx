import { PortableText } from '@portabletext/react';
import React from 'react';

import { CMSNames, type PropsWithCMS } from '@/types';
import { getCmsKey, withCMS } from '@/models/withCMS';

type Props = PropsWithCMS & {
  value: any;
  components?: any;
};

const GenericRichText = ({ value, components, cms }: Props) => {
  if (cms === CMSNames.sa) {
    return <PortableText value={value} components={components} />;
  }

  return null;
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

export default withCMS({ sa, sb })(GenericRichText);
