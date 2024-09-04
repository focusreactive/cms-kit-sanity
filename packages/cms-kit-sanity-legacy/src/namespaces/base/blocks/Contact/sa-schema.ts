import { defineBlockType, defineUtilityType } from "@ns/sa-config";

//TODO: make generic type for richtext
const customRichText = defineUtilityType(({ df }) => ({
  name: "customRichText",
  title: "Custom Rich Text",
  type: "array",
  of: [
    df({
      type: "block",
    }),
  ],
}));

const contact = defineBlockType(({ df }) => ({
  name: "contact",
  type: "object",
  title: "Contact",
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
      name: "labels",
      type: "object",
      fields: [
        df({
          name: "first_name",
          type: "string",
        }),
        df({
          name: "last_name",
          type: "string",
        }),
        df({
          name: "company",
          type: "string",
        }),
        df({
          name: "country",
          type: "string",
        }),
        df({
          name: "email",
          type: "string",
        }),
        df({
          name: "phone_number",
          type: "string",
        }),
        df({
          name: "message",
          type: "string",
        }),
        df({
          name: "agree_to_policies",
          type: "string",
        }),
        df({
          name: "send_button",
          type: "string",
        }),
        df({
          name: "agreement",
          type: customRichText.name,
        }),
      ],
    }),
  ],
}));

export default [contact, customRichText];
