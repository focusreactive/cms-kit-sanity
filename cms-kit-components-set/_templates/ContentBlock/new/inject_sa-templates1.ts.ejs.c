---
inject: true
to: ContentBlocks/sa-templates.ts
before: '// HYGEN-IMPORTS-END'
---

import <%= h.changeCase.camel(name) %> from './<%= name %>/sa-templates';