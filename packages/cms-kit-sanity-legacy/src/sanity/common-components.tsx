import { PortableText } from '@portabletext/react';
import React from 'react';

export const GenericRichText = ({
  value,
  components,
}: {
  value: any;
  components?: any;
}) => {
  return <PortableText value={value} components={components} />;
};
