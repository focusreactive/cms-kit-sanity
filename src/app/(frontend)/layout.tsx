import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

const VisualEditing = dynamic(() => import('@/sanity/loader/VisualEditing'));

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {draftMode().isEnabled && <VisualEditing />}
    </>
  );
}
