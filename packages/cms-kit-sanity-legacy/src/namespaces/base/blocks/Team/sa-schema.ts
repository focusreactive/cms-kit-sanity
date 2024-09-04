import { defineBlockType, defineUtilityType } from "@ns/sa-config";

//TODO: make generic type for images
const avatarWithAlt = defineUtilityType(({ df }) => ({
  name: "avatarWithAlt",
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

const person = defineUtilityType(({ df }) => ({
  name: "person",
  type: "object",
  fields: [
    df({
      name: "name",
      type: "string",
    }),
    df({
      name: "title",
      type: "string",
    }),
    df({
      name: "avatar",
      type: avatarWithAlt.name,
    }),
  ],
}));

const team = defineBlockType(({ df }) => ({
  name: "team",
  type: "object",
  title: "TEAM",
  fields: [
    df({
      name: "title",
      type: "string",
    }),
    df({
      name: "description",
      type: "string",
    }),
    df({
      name: "people",
      type: "array",
      of: [{ type: person.name }],
    }),
  ],
}));

export default [team, person, avatarWithAlt];
