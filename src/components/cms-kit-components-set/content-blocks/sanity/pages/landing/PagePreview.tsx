'use client'

import { type QueryResponseInitial } from '@sanity/react-loader/rsc'

import { useQuery } from '@/sanity/loader/useQuery'
import { PagePayload } from '../../../../pages/landing/types'
import Page from '../../../../pages/landing/Page'
import { landingPageQuery } from './sa/landingPageQuery'
import { LandingPayload } from '@/types'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<PagePayload | null>
}

export default function PagePreview(props: Props) {
  const { params, initial } = props
  const { data } = useQuery<LandingPayload | null>(landingPageQuery, params, {
    initial,
  })

  return <Page data={data!} />
}
