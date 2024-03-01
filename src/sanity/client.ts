import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, isPreview, useCdn } from './lib/env';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn, // if you're using ISR or only static generation at build time, then you can set this to `false` to guarantee no stale content: ;
  perspective: isPreview ? 'previewDrafts' : 'published',
  stega: {
    enabled: false,
    studioUrl: '/admin', // Or: 'https://my-cool-project.sanity.studio'
  },
});
