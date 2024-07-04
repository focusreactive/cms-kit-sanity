---
inject: true
to: ContentBlocks/sa-schemas.ts
before: '// HYGEN-ARRAY-END'
---
  ...<%= h.changeCase.camel(name) %>,