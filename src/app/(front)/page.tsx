import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { studioUrl } from '@/sanity/lib/api'
import { loadHomePage } from '@/sanity/loader/loadQuery'
import Page from '@/components/here_reusable_components_lets_decide_the_folders_name/pages/landing/Page'
const PagePreview = dynamic(
  () => import('@/components/here_reusable_components_lets_decide_the_folders_name/cms/pages/landing/PagePreview'),
)

export default async function IndexRoute() {
  const initial = await loadHomePage()

  if (draftMode().isEnabled) {
    return <PagePreview params={{ slug: 'home' }} initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{' '}
        <Link href={`${studioUrl}/desk/home`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  return <Page data={initial.data} />
}
