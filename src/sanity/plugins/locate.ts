import { map, Observable } from 'rxjs';
import {
  DocumentLocationResolver,
  DocumentLocationsState,
} from 'sanity/presentation';

import { resolveHref } from '../lib/utils';

export const locate: DocumentLocationResolver = (params, context) => {
  // TODO: get type here from config
  if (params.type === 'landing') {
    const doc$ = context.documentStore.listenQuery(
      `*[_id == $id || references($id)] { _type, slug, title }`,
      params,
      { perspective: 'previewDrafts' },
    ) as Observable<
      | {
          _type: string;
          slug: { current: string };
          title: string | null;
        }[]
      | null
    >;

    return doc$.pipe(
      map(docs => {
        switch (params.type) {
          // TODO: get type here from config
          case 'landing': {
            return {
              locations: docs
                ?.map(doc => {
                  const href = resolveHref(doc._type, doc?.slug?.current);
                  return {
                    title: doc?.title || 'Untitled',
                    href: href!,
                  };
                })
                .filter(doc => doc.href !== undefined),
            } satisfies DocumentLocationsState;
          }

          default: {
            return {
              message: 'Unable to map document type to locations',
              tone: 'critical',
            } satisfies DocumentLocationsState;
          }
        }
      }),
    );
  }

  return null;
};
