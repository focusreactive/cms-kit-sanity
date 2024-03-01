export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as string;
export const previewUrl =
  process.env.NEXT_PUBLIC_PREVIEW_URL || 'http://localhost:3000';
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21';

export const isPreview = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';
export const useCdn = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';
