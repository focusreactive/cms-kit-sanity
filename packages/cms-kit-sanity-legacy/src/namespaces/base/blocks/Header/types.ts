import type { SanityClient } from 'sanity';

import type { SmartImageProps } from '@/sanity/common/SmartImage/Component';
import type { LinkProps } from '@/sanity/common/SmartLink/Component';
import type { ContentBlockGeneric } from '@/sanity/types';

export type Props = ContentBlockGeneric & {
  header: string;
  text: string;
  isIncludeBackgroundImage: boolean;
  backgroundImage: SmartImageProps;
  links: Array<LinkProps>;
  stats: Array<{ _key: string; title: string; value: string }>;
  sanityClient: SanityClient;
};
