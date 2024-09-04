export const contactConverter = (block) => {
  return {
    title: block?.title,
    description: block?.description,
    labels: { ...block.labels },
  };
};
