import { defineBlockType, defineUtilityType } from "@ns/sa-config";

//TODO: make generic type for images
const iconWithAlt = defineUtilityType(({ df }) => ({
  name: "iconWithAlt",
  type: "object",
  fields: [
    df({
      name: "image",
      type: "image",
    }),
    df({
      name: "alt",
      type: "string",
    }),
  ],
}));

const link = defineUtilityType(({ df }) => ({
  name: "link",
  type: "object",
  fields: [
    df({
      name: "label",
      type: "string",
    }),
    df({
      name: "url",
      type: "string",
    }),
  ],
}));

const cta = defineBlockType(({ df }) => ({
  name: "cta",
  type: "object",
  title: "CTA",
  fields: [
    df({
      name: "title",
      type: "string",
    }),
    df({
      name: "subtitle",
      type: "string",
    }),
    df({
      name: "description",
      type: "string",
    }),
    df({
      name: "image",
      type: iconWithAlt.name,
    }),
    df({
      name: "cta1",
      type: link.name,
    }),
    df({
      name: "cta2",
      type: link.name,
    }),
  ],
}));

export default [cta, iconWithAlt, link];
