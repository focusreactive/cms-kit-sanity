'use client';
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/admin/[[...index]]/studio.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';

import { apiVersion, dataset, projectId, studioUrl } from '@/cms/lib/api';
import * as resolve from '@/cms/plugins/resolve';
import { pageStructure, singletonPlugin } from '@/cms/plugins/settings';

import { schemaTypes } from './schemas';
import home from './schemas/singletons/home';
import settings from './schemas/singletons/settings';
import { CMSKitContentBlocks } from '@focus-reactive/sanity-plugin-cms-kit';

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'CMS-KIT Sanity';

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: pageStructure([home, settings]),
    }),
    CMSKitContentBlocks({}),
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
});
