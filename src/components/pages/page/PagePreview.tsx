'use client'

import { type QueryResponseInitial } from '@sanity/react-loader/rsc'

import { pagesBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { PagePayload } from '../../../sets/tw-base/pages/landing/types'

import Page from '../../../sets/tw-base/pages/landing/Page'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<PagePayload | null>
}

export default function PagePreview(props: Props) {
  const { params, initial } = props
  const { data } = useQuery<PagePayload | null>(pagesBySlugQuery, params, {
    initial,
  })

  return <Page data={data!} />
}
