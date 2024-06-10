import 'server-only';

import { draftMode } from 'next/headers';

import { pagesBySlugQuery } from '@/sanity/lib/queries';
import { token } from '@/sanity/lib/token';
import { PagePayload } from '@/sets/tw-base/pages/landing/types';

import { queryStore } from './createQueryStore';
import { sanityClient } from '../client';
import {isPreview} from "@/sanity/lib/env";

const serverClient = sanityClient.withConfig({
  token,
  stega: {
    enabled: isPreview,
  },
});

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient);

const usingCdn = serverClient.config().useCdn;
// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {}) => {
  const {} = options;
  const perspective = draftMode().isEnabled
    ? 'previewDrafts'
    : options.perspective;
  // Don't cache by default
  let cache: RequestCache = 'no-store';
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    cache = 'force-cache';
  }
  return queryStore.loadQuery(query, params, {
    cache,
    ...options,
    perspective,
  });
}) satisfies typeof queryStore.loadQuery;

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export function loadPage(slug: string) {
  return loadQuery<PagePayload | null>(
    pagesBySlugQuery,
    { slug },
    {
      next: { tags: [`page:${slug}`], revalidate: 10 },
      perspective: 'previewDrafts',
    },
  );
}
