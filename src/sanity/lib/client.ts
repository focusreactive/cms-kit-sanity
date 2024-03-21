import { createClient } from '@sanity/client/stega';

import { apiVersion, dataset, projectId } from './env';

import { revalidateSecret, studioUrl } from './api';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
  useCdn: revalidateSecret ? false : true,
  perspective: 'published',
  stega: {
    studioUrl,
    // logger: console,
  },
});
