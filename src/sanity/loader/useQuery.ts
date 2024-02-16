import {
  type QueryParams,
  useEncodeDataAttribute,
  type UseQueryOptions,
} from '@sanity/react-loader/rsc';

import { studioUrl } from '@/sanity/lib/api';

import { queryStore } from './createQueryStore';

/**
 * Exports to be used in client-only or components that render both server and client
 */
export const useQuery = <
  QueryResponseResult = unknown,
  QueryResponseError = unknown,
>(
  query: string,
  params?: QueryParams,
  options?: UseQueryOptions<QueryResponseResult>,
) => {
  const snapshot = queryStore.useQuery<QueryResponseResult, QueryResponseError>(
    query,
    params,
    // @ts-ignore
    options,
  );

  const encodeDataAttribute = useEncodeDataAttribute(
    snapshot.data,
    snapshot.sourceMap,
    studioUrl,
  );

  // Always throw errors if there are any
  if (snapshot.error) {
    throw snapshot.error;
  }

  return {
    ...snapshot,
    encodeDataAttribute,
  };
};

/**
 * Used by `./VisualEditing.tsx` to connect to `sanity/presentation`
 */
export const { useLiveMode } = queryStore;
