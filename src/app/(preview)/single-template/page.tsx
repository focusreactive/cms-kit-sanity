'use client';

import { sets } from '@/components/here_reusable_components_lets_decide_the_folders_name/config';
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
