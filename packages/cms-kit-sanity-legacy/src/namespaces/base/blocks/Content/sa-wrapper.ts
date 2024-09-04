import { imageConverter } from "@ns/blocks/converters/sa-wrappers";

export const contentConverter = (block) => {
  return {
    title: block?.title,
    subtitle: block?.subtitle,
    description: block?.description,
    image: imageConverter(block?.image),
    points: block?.points?.map((point) => ({
      ...point,
      icon: imageConverter(point?.icon),
    })),
    customRichText1: block?.customRichText1,
  };
};
