import { imageConverter } from "@ns/blocks/converters/sa-wrappers";

export const CTAConverter = (block) => {
  return {
    title: block?.title,
    subtitle: block?.subtitle,
    description: block?.description,
    image: imageConverter(block?.image),
    cta1: { ...block?.cta1 },
    cta2: { ...block?.cta2 },
  };
};
