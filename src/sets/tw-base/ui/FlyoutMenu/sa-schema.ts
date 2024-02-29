import { defineBlockType, defineUtilityType } from "@ns/sa-config";

import saMock from "./sa-mock.json";

const blogTag = defineUtilityType(({ df }) => ({
  name: "blogSection.post.tag",
  type: "object",
  title: "Blog tag",
  fields: [
    df({
      name: "label",
      type: "string",
    }),
    df({
      name: "href",
      type: "string",
    }),
  ],
}));

const blogAuthor = defineUtilityType(({ df }) => ({
  name: "blogSection.post.author",
  type: "object",
  title: "Blog Author",
  fields: [
    df({
      name: "name",
      type: "string",
    }),
    df({
      name: "avatar",
      type: "string",
    }),
    df({
      name: "role",
      type: "string",
    }),
  ],
}));

const blogPost = defineUtilityType(({ df }) => ({
  name: "blogSection.post",
  type: "object",
  title: "Blog post",
  fields: [
    df({
      name: "date",
      type: "string",
    }),
    df({
      name: "header",
      type: "string",
    }),
    df({
      name: "text",
      type: "string",
    }),
    df({
      name: "authors",
      type: "array",
      of: [{ type: blogAuthor.name }],
    }),
    df({
      name: "tags",
      type: "array",
      of: [{ type: blogTag.name }],
    }),
  ],
}));

const blogSection = defineBlockType(({ df }) => ({
  name: "blogSection",
  type: "object",
  title: "Blog section",
  fields: [
    df({
      name: "header",
      type: "string",
    }),
    df({
      name: "text",
      type: "string",
    }),
    df({
      name: "posts",
      type: "array",
      of: [{ type: blogPost.name }],
    }),
  ],
  initialValue: saMock,
}));

export default [blogSection, blogPost, blogAuthor, blogTag];
