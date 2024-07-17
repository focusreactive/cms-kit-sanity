---
inject: true
to: ContentBlocks/sa-schemas.ts
before: '// HYGEN-IMPORTS-END'
---

import <%= h.changeCase.camel(name) %> from './<%= name %>/sa-schema';