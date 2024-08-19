import '@/styles/index.css';

import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
// TODO: use this if your description is Formatted text
// import { toPlainText } from 'next-sanity'
import { Suspense } from 'react';

import { urlForOpenGraphImage } from '@/sanity/lib/utils';
import { loadHomePage, loadSettings } from '@/sanity/loader/loadQuery';

const LiveVisualEditing = dynamic(
  () => import('@/sanity/loader/LiveVisualEditing'),
);

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: homePage }] = await Promise.all([
    loadSettings(),
    loadHomePage(),
  ]);

  const ogImage = urlForOpenGraphImage(settings?.ogImage);
  return {
    title: homePage?.title
      ? {
          template: `%s | ${homePage.title}`,
          default: homePage.title || 'Personal website',
        }
      : undefined,
    description: homePage?.description,
    // TODO: uncomment this if your description is Formatted text
    // ? toPlainText(homePage.description)
    // : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#000',
};

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>{children}</Suspense>
      {draftMode().isEnabled && <LiveVisualEditing />}
    </>
  );
}
