import imageUrlBuilder from '@sanity/image-url';

import { sanityClient } from '../client';

const builder = imageUrlBuilder(sanityClient);

export const getDefaultImageUrl = (url: string) => {
  return builder.image(url).url();
};
