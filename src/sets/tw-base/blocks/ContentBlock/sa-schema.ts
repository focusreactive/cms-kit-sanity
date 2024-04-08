import { defineBlockType, defineUtilityType } from "@ns/sa-config";

//TODO: make generic type for images
const imageWithAlt1 = defineUtilityType(({ df }) => ({
  name: "imageWithAlt1",
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

//TODO: make generic type for keypoint
export const contentPoint = defineUtilityType(({ df }) => ({
  name: "contentPoint",
  type: "object",
  fields: [
    df({
      name: "name",
      type: "string",
    }),
    df({
      name: "description",
      type: "string",
    }),
    df({
      name: "icon",
      type: imageWithAlt1.name,
    }),
  ],
}));

//TODO: make generic type for richtext
const customRichText1 = defineUtilityType(({ df }) => ({
  name: "customRichText1",
  title: "Custom Rich Text",
  type: "array",
  of: [
    df({
      type: "block",
    }),
    df({
      type: contentPoint.name,
    }),
  ],
}));

const lastPoint = defineUtilityType(({ df }) => ({
  name: "lastPoint",
  type: "object",
  fields: [
    df({
      name: "title",
      type: "string",
    }),
    df({
      name: "description",
      type: "string",
    }),
  ],
}));

const content = defineBlockType(({ df }) => ({
  name: "content",
  type: "object",
  title: "CONTENT",
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
      type: imageWithAlt1.name,
    }),
    df({
      name: "customRichText1",
      type: customRichText1.name,
    }),
  ],
}));

export default [
  content,
  imageWithAlt1,
  lastPoint,
  contentPoint,
  customRichText1,
];
