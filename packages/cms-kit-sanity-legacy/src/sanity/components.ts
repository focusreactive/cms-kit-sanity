// TODO: switch to a common approach when with collect from kits on @/namespaces level and then have a single import only
import { kit as base } from '@/namespaces/base/sa-kit';
import { kit as land } from '@/namespaces/landing/sa-kit';

import type { BlocksMap, ComponentsStore, Kit } from './types';

type Config = {
  [key in string]: BlocksMap;
};

const config: Config = {
  [base.name]: base[base.name].blocksMap,
  [land.name]: land[land.name].blocksMap,
};

const componentsStore: ComponentsStore = {
  namespaces: [],
  blocksMap: {},
  initialized: false,
};

export const initComponentsStore = (
  namespaces: Array<string>,
  customNamespaces?: Array<Kit>,
) => {
  const customNamespacesConfiguration = customNamespaces
    ? customNamespaces.reduce(
        (acc, ns) => ({
          ...acc,
          [ns.name]: ns[ns.name].blocksMap,
        }),
        {},
      )
    : {};
  const namespacesConfiguration = {
    ...config,
    ...customNamespacesConfiguration,
  };

  namespaces.forEach(ns => {
    componentsStore.blocksMap = {
      ...componentsStore.blocksMap,
      ...namespacesConfiguration[ns],
    };
    componentsStore.namespaces.push(ns);
  });

  componentsStore.initialized = true;
};

export const getComponents = (): BlocksMap => {
  if (!componentsStore.initialized) {
    throw new Error('componentsStore has not been initialized');
  }

  return componentsStore.blocksMap;
};

export const getStoreStatus = () => componentsStore.initialized;
