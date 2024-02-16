import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { cmsKitPlugin, deskTool } from '@focus-reactive/cms-kit-sanity/sanity';
import { presentationTool } from 'sanity/presentation';

import { schemaTypes } from './schemas';
import post from './schemas/post';
import { locate } from './plugins/locate';
import { dataset, previewUrl, projectId } from './lib/env';
import { test } from 'external-namespaces';

export default defineConfig({
  name: 'default',
  title: 'cms-kit-playground',

  projectId,
  dataset,

  plugins: [
    deskTool({ previewUrl }),
    visionTool(),
    cmsKitPlugin({
      namespaces: ['base'],
      customNamespaces: [test],
      pageSchema: post,
      projectId: 'k0c6krxi',
      dataset: 'production',
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
