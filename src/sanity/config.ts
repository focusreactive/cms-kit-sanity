import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { cmsKitPlugin, deskTool } from '@focus-reactive/cms-kit-sanity/sanity';
import { presentationTool } from 'sanity/presentation';
import { media } from 'sanity-plugin-media';

import { schemaTypes } from './schemas';
import { landing } from '../sets/tw-base/pages/landing/sa/landing';
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
      namespaces: [],
      sets,
      pageSchema: landing,
      projectId,
      dataset,
      // previewUrl,
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
    media(),
  ],
  schema: {
    types: schemaTypes,
  },
});
