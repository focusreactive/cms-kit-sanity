'use client';

import type { PagePayload } from './types';

import { renderSanityComponent } from '@focus-reactive/cms-kit-sanity/sanity-next';
import { SimpleHero } from '../../ui-layer/SimpleHero';
import SimpleFooter from '@/components/global/SimpleFooter';
import twBase from '../../content-blocks/sanity';

export interface PageProps {
  data: PagePayload | null;
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, badgeText, description, content } = data ?? {};

  return (
    <div>
      <SimpleHero
        title={title || 'CMS-KIT-Sanity'}
        badgeText={badgeText}
        description={description}
      />
      {content?.map(
        renderSanityComponent({
          sets: [twBase],
        }),
      )}
      <SimpleFooter />
    </div>
  );
}

export default Page;
