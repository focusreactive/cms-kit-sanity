'use client';

import { sets } from '@/sets/config';
import { twBase } from '@/sets/tw-base/sa-set';
import { renderSanityComponent } from '@focus-reactive/cms-kit-sanity/sanity-next';

export default function SingleTemplatePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const template = searchParams?.t
    ? JSON.parse(decodeURIComponent(searchParams.t as string))
    : null;

  return (
    <div style={{ borderRadius: 4, border: '2px solid black' }}>
      {renderSanityComponent({ sets })(template)}
    </div>
  );
}
