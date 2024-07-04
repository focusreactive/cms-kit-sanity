import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { PostListItem } from '@/components/pages/home/PostListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcasePosts = [], title = '' } = data ?? {}

  return (
    <div className="space-y-20">
      {/* Header */}
      {title && <Header centered title={title} description={overview} />}
      {/* Showcase posts */}
      {showcasePosts && showcasePosts.length > 0 && (
        <div className="mx-auto max-w-[100rem] rounded-md border">
          {showcasePosts.map((post, key) => {
            const href = resolveHref(post?._type, post?.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                href={href}
                data-sanity={encodeDataAttribute?.([
                  'showcasePosts',
                  key,
                  'slug',
                ])}
              >
                <PostListItem post={post} odd={key % 2} />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default HomePage
