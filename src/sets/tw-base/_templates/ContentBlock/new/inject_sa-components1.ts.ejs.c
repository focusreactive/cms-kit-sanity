---
inject: true
to: ContentBlocks/sa-components.ts
before: '// HYGEN-IMPORTS-END'
---


import { <%= name %> } from './<%= name %>';
import <%= h.changeCase.camel(name) %> from './<%= name %>/sa-schema';