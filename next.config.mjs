/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: '/_next/static/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/_next/image/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/scripts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400, stale-while-revalidate=604800',
        }, // Shorter cache for scripts
      ],
    },
  ],
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: [
      'localhost',
      'api.dev.goods2load.com',
      'api.stage.goods2load.com',
      'lh3.googleusercontent.com',
      'api.dev.goods2load.com',
      'production-dubainight.s3.me-south-1.amazonaws.com',
    ],
  },
  compress: true,
};

export default nextConfig;
