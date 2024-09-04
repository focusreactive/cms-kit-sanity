import { imageConverter } from "@ns/blocks/converters/sa-wrappers";

export const teamConverter = (block) => {
  return {
    title: block?.title,
    description: block?.description,
    people: block?.people?.map((person) => ({
      ...person,
      avatar: imageConverter(person.avatar),
    })),
  };
};
