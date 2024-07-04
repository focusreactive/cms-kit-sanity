'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/admin/[[...index]]/studio.tsx` route
 */

import { cmsKitPlugin, deskTool } from '@focus-reactive/cms-kit-sanity/sanity'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import * as resolve from '@/sanity/plugins/resolve'
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings'

import { sets } from '@/components/config'
import { schemaTypes } from './schemas'
import {landing} from '@/components/pages/landing/sa/landing'
import home from './schemas/singletons/home'
import settings from './schemas/singletons/settings'

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'CMS-KIT Sanity'
const previewUrl =
  process.env.NEXT_PUBLIC_PREVIEW_URL || 'http://localhost:3000'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    deskTool({
      previewUrl,
    }),
    // structureTool({
    //   structure: pageStructure([home, settings]),
    // }),
    cmsKitPlugin({
      namespaces: [],
      sets,
      pageSchema: landing,
      projectId,
      dataset,
      // previewUrl,
    }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})