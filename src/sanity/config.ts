import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { cmsKitPlugin, deskTool } from '@focus-reactive/cms-kit-sanity/sanity';
import { presentationTool } from 'sanity/presentation';

import { schemaTypes } from './schemas';
import post from './schemas/post';
import { locate } from './plugins/locate';
import { dataset, previewUrl, projectId } from './lib/env';
import { twBase } from '@/sets/tw-base/sa-set';

console.log("🚀 ~ previewUrl:", previewUrl)

export default defineConfig({
  name: 'default',
  title: 'cms-kit-sanity',
  basePath: '/admin',
  projectId,
  dataset,

  plugins: [
    deskTool({ previewUrl }),
    visionTool(),
    cmsKitPlugin({
      namespaces: [],
      customNamespaces: [twBase],
      pageSchema: post,
      projectId,
      dataset,
    }),
    presentationTool({
      locate,
      previewUrl: {
        origin: previewUrl,
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
