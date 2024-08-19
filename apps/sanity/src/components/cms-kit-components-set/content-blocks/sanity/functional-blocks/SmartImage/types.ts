export type SmartImageProps = {
  className: string;
  imageWithMetadata: {
    imageAsset: { src: string; alt: string; width: string; height: string };
  };
  priority: boolean;
};
