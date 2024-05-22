'use client';

import type { PagePayload } from './types';

import { renderSanityComponent } from '@focus-reactive/cms-kit-sanity/sanity-next';
import { twBase } from '@/sets/tw-base/sa-set';
import { sets } from '@/sets/config';
import { twExt } from '@/sets/tw-ext/sa-set';
import SimpleHero from '@/components/heroes/SimpleHero';
import SimpleFooter from '@/components/footers/SimpleFooter';

export interface PageProps {
  data: PagePayload | null;
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, badgeText, description, content } = data ?? {};

  return (
    <div>
      <SimpleHero
        // @ts-ignore
        title={title}
        badgeText={badgeText}
        description={description}
      />
      {content?.map(
        renderSanityComponent({
          customNamespaces: sets,
        }),
      )}
      <SimpleFooter />
    </div>
  );
}

export default Page;
