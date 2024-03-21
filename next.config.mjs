/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'cdn.sanity.io' }],
  },
  // logging: {
  //   fetches: {
  //     // Note: enable to debug fetching
  //     // fullUrl: true,
  //   },
  // },
};

export default nextConfig;
