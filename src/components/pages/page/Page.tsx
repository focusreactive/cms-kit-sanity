import type { PagePayload } from './types';
import { renderSanityComponent } from '@focus-reactive/cms-kit-sanity/sanity-next';
import { twBase } from '@/sets/tw-base/sa-set';

export interface PageProps {
  data: PagePayload | null;
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, content } = data ?? {};

  return (
    <div>
      <h1 className={'text-5xl bold text-center'}>{title}</h1>
      {content?.map(
        renderSanityComponent({
          namespaces: ['base', 'land'],
          customNamespaces: [twBase],
        }),
      )}
    </div>
  );
}

export default Page;
