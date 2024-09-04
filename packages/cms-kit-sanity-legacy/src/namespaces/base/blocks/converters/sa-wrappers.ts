export const imageConverter = (image) => {
  return {
    src: image.image.asset.url,
    alt: image.image.alt,
    width: image.image.asset.metadata.width,
    height: image.image.asset.metadata.height,
  };
};
