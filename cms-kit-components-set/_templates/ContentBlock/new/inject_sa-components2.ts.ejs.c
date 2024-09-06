---
inject: true
to: ContentBlocks/sa-components.ts
before: '// HYGEN-ARRAY-END'
---
  [findBlockRoot(<%= h.changeCase.camel(name) %>)]: <%= name %>,