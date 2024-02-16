import { DocumentLocationResolver } from 'sanity/presentation';
import { map } from 'rxjs';

// Pass 'context' as the second argument
export const locate: DocumentLocationResolver = (params, context) => {
  // Set up locations for post documents
  if (params.type === 'dynamicPage') {
    // Subscribe to the latest slug and title
    const doc$ = context.documentStore.listenQuery(
      `*[_id == $id][0]{slug,documentTitle}`,
      params,
      { perspective: 'previewDrafts' }, // returns a draft article if it exists
    );
    console.log('🚀 ~ file: locate.ts:14 ~ locate ~ doc$:', doc$);
    // Return a streaming list of locations
    return doc$.pipe(
      map((doc) => {
        console.log('🚀 ~ file: locate.ts:18 ~ map ~ doc:', doc);
        // If the document doesn't exist or have a slug, return null
        if (!doc || !doc.slug?.current) {
          return null;
        }

        if (doc?.slug.current === '/') {
          return {
            locations: [
              {
                title: 'Home Page',
                href: '/',
              },
            ],
          };
        }

        return {
          locations: [
            {
              title: doc?.documentTitle || 'Untitled',
              href: `/${doc?.slug.current}`,
            },
            // {
            //   title: 'Posts',
            //   href: '/',
            // },
          ],
        };
      }),
    );
  }

  return null;
};
