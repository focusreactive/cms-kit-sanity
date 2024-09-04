export const imageConverter = (image) => {
  return {
    src: image.asset.url,
    alt: image.alt,
    width: image.asset.metadata.dimensions.width,
    height: image.asset.metadata.dimensions.height,
  };
};
