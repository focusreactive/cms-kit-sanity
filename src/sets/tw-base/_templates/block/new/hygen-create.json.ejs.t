---
to: <%= name %>/hygen-create.json
---
{
  "about": "This is a hygen-create definitions file. The hygen-create utility creates generators that can be executed using hygen.",
  "hygen_create_version": "0.2.0",
  "name": "block",
  "files_and_dirs": {
    "hygen-create.json": true,
    "blocks/<%= h.inflection.camelize(name, false) %>/Component.tsx": true,
    "blocks/<%= h.inflection.camelize(name, false) %>/index.ts": true,
    "blocks/<%= h.inflection.camelize(name, false) %>/sa-adapters.ts": true,
    "blocks/<%= h.inflection.camelize(name, false) %>/sa-components.ts": true,
    "blocks/<%= h.inflection.camelize(name, false) %>/sa-schema.ts": true,
    "blocks/<%= h.inflection.camelize(name, false) %>/sa-templates.ts": true
  },
  "templatize_using_name": "<%= h.inflection.camelize(name, false) %>",
  "gen_parent_dir": true
}