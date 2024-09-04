import { GroupOptions, type ExtendedType } from "@/sanity/types";

const defineField = field => field;

export const defineGlobalType = (typeFn): ExtendedType => {
  const type = typeFn({ df: defineField });
  type.kitOptions = { group: GroupOptions.GLOBAL };
  type.name = `glob.${type.name}`;
  type.title = `_${type.title}`;
  type.description = `${type.description || 'utility type'} (global)`;

  return type;
};
