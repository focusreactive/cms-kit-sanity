import type { ContentBlockGeneric } from '@/sanity/types';

export type Props = ContentBlockGeneric & {
  header: string;
  text: string;
  placeholder: string;
  buttonText: string;
  points: Array<{ icon: string; title: string; text: string }>;
};
