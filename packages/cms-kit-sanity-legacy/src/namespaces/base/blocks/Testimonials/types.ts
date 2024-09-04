import type { ContentBlockGeneric } from '@/sanity/types';

export type Props = ContentBlockGeneric & {
  text: string;
  person: { name: string; avatar: string; role: string };
};
