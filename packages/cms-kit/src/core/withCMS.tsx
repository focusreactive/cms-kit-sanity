import React from 'react';
import { getCurrentCMS } from './cmsContext';

export type AdapterFn = (cmsProps: object) => object;

export const withCMS =
  (adapters: { sa?: AdapterFn; sb?: AdapterFn; na?: AdapterFn }) =>
  (Component) => {
    function getDisplayName(WrappedComponent) {
      return (
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
      );
    }
    const componentName = getDisplayName(Component);

    const WrappedComponent = (cmsProps) => {
      const cms = getCurrentCMS();
      const adapterFn = cms?.name ? adapters[cms.name] : null;
      const props = adapterFn ? adapterFn(cmsProps) : cmsProps;

      return <Component {...props} cms={cms.name} />;
    };

    WrappedComponent.displayName = `withWrapper(${componentName})`;

    return WrappedComponent;
  };


