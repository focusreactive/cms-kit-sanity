/**
 * Sets up the Presentation Resolver API,
 * see https://www.sanity.io/docs/presentation-resolver-api for more information.
 */

import { defineDocuments, defineLocations } from 'sanity/presentation'

import { resolveHref } from '@/sanity/lib/utils'

export const mainDocuments = defineDocuments([
  {
    route: '/blog/:slug',
    filter: `_type == "post" && slug.current == $slug`,
  },
  {
    route: '/:slug',
    filter: `_type == "landing" && slug.current == $slug`,
  },
])

export const locations = {
  settings: defineLocations({
    message: 'This document is used on all pages',
    tone: 'caution',
  }),
  home: defineLocations({
    message: 'This document is used to render the front page',
    tone: 'positive',
    locations: [{ title: 'Home', href: resolveHref('home')! }],
  }),
  blog: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Untitled',
          href: resolveHref('blog', doc?.slug)!,
        },
      ],
    }),
  }),
  landing: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Untitled',
          href: resolveHref('landing', doc?.slug)!,
        },
      ],
    }),
  }),
}
