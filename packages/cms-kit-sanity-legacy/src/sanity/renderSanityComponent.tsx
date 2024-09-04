import React from 'react';

import { CMSNames } from '@/types/cms';
import UnknownBlock from '@/namespaces/debug/UnknownBlock';
import type { NameSpaceName } from '@/types';

import {
  getComponents,
  getStoreStatus,
  initComponentsStore,
} from './components';
import { setCurrentCMS } from '..';
import type { ContentBlockData, Kit } from './types';

type RenderSanityComponentArg = {
  namespaces?: Array<string>;
  customNamespaces?: Array<Kit>;
  sets?: Array<Kit>;
  customProps?: any;
};

export const renderSanityComponent = ({
  namespaces = [],
  customNamespaces = [],
  sets = customNamespaces,
  customProps,
}: RenderSanityComponentArg) => {
  if (sets) {
    namespaces.push(...sets.map(ns => ns.name));
  }

  setCurrentCMS(CMSNames.sa);
  if (!getStoreStatus()) {
    initComponentsStore(namespaces, sets);
  }
  const componentsMap = getComponents();

  const renderComponent = (contentBlock: ContentBlockData) => {
    const type = contentBlock?._type;

    const Component = componentsMap[type] || UnknownBlock;

    const renderer = Component?.isServerComponent
      ? { renderSanityComponent }
      : {};

    return (
      <Component
        key={contentBlock._key}
        {...contentBlock}
        {...(customProps || {})}
        {...renderer}
      />
    );
  };

  return renderComponent;
};
