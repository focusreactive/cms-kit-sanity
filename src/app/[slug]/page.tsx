import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { Page } from '@/components/pages/page/Page';
import { loadPage } from '@/sanity/loader/loadQuery';

const PagePreview = dynamic(
  () => import('@/components/pages/page/PagePreview'),
);

type Props = {
  params: { slug: string };
};

export default async function PageSlugRoute({ params }: Props) {
  const initial = await loadPage(params.slug);

  if (draftMode().isEnabled) {
    return <PagePreview params={params} initial={initial} />;
  }

  if (!initial.data) {
    return notFound();
  }

  return <Page data={initial.data} />;
}
