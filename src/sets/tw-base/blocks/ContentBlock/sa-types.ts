export type CMSProps = {
  title: string;
  subtitle: string;
  description: string;
  image: {
    image: object;
    alt: string;
  };
  points: Array<{
    name: string;
    description: string;
    icon: {
      image: object;
      alt: string;
    };
  }>;
  customRichText1: object;
};
