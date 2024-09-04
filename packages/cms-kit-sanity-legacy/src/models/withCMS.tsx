import React from 'react';

import { CMSNames } from '@/types/cms';

import { getCurrentCMS } from './wrappers-store';

export type AdapterFn = (cmsProps: object) => object;

export const withCMS =
  (options: { sa?: AdapterFn; sb?: AdapterFn; na?: AdapterFn }) => Component => {
    function getDisplayName(WrappedComponent) {
      return (
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
      );
    }
    const componentName = getDisplayName(Component);

    const WrappedComponent = cmsProps => {
      const cms = getCurrentCMS();
      if (cms.name === CMSNames.na) {
        return <Component {...cmsProps} cms={cms.name} />;
      }
      const processCmsProps = options[cms.name];
      if (!processCmsProps) {
        throw new Error(
          `cmsConvertProps function hasn't specified for ${componentName}. To add this specify: ${componentName}.${cms.name} = (cmsProps) => componentProps`,
        );
      }
      const props = processCmsProps(cmsProps);

      return <Component {...props} cms={cms.name} />;
    };

    WrappedComponent.displayName = `withWrapper(${componentName})`;

    return WrappedComponent;
  };

export const getCmsKey = props => {
  const getKey = {
    sa: props => props._key,
    sb: props => props.uid,
    na: props => props.ind,
  };
  const cms = getCurrentCMS();

  return getKey[cms.name](props);
};
