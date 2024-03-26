import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { cmsKitPlugin, deskTool } from '@focus-reactive/cms-kit-sanity/sanity';
import { presentationTool } from 'sanity/presentation';

import { schemaTypes } from './schemas';
import { landing } from './schemas/landing';
import { locate } from './plugins/locate';
import { dataset, previewUrl, projectId } from './lib/env';
import { sets } from '@/sets/config';

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
      sets,
      namespaces: [],
      customNamespaces: [],
      pageSchema: landing,
      projectId,
      dataset,
    }),
    presentationTool({
      locate,
      previewUrl: {
        // origin: previewUrl,
        origin:
            typeof location === 'undefined'
                ? 'http://localhost:3000'
                : location.origin,
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
