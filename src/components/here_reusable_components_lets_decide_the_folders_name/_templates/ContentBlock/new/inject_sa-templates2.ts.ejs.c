---
inject: true
to: ContentBlocks/sa-templates.ts
before: '// HYGEN-ARRAY-END'
---
  ...<%= h.changeCase.camel(name) %>,