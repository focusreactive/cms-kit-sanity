import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

export default function classNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
