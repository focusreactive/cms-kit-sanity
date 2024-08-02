'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { postBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { BlogPostPayload } from '@/types'

import BlogPost from '../../../../pages/blog/BlogPost'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<BlogPostPayload | null>
}

export default function BlogPostPreview(props: Props) {
  const { params, initial } = props
  const { data, encodeDataAttribute } = useQuery<BlogPostPayload | null>(
    postBySlugQuery,
    params,
    { initial },
  )

  return <BlogPost data={data!} encodeDataAttribute={encodeDataAttribute} />
}
