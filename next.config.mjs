// import path from 'path';
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     esmExternals: 'loose',
//   },
//   webpack: (config, { isServer }) => {
//     // Ensure proper path resolution
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       '@': path.resolve(process.cwd(), './'),
//     };
//     return config;
//   },
//   headers: async () => {
//     if (process.env.NODE_ENV === 'production') {
//       return [
//         {
//           source: '/_next/static/:path*',
//           headers: [
//             {
//               key: 'Cache-Control',
//               value: 'public, max-age=31536000, immutable',
//             },
//           ],
//         },
//         {
//           source: '/_next/image/:path*',
//           headers: [
//             {
//               key: 'Cache-Control',
//               value: 'public, max-age=604800, immutable',
//             },
//           ],
//         },
//         {
//           source: '/scripts/:path*',
//           headers: [
//             {
//               key: 'Cache-Control',
//               value: 'public, max-age=3600, stale-while-revalidate=86400',
//             },
//           ],
//         },
//       ];
//     }
//     return [];
//   },
//   images: {
//     formats: ['image/webp', 'image/avif'],
//     domains: [
//       'localhost',
//       'api.dev.goods2load.com',
//       'api.stage.goods2load.com',
//       'lh3.googleusercontent.com',
//       'api.dev.goods2load.com',
//       'production-dubainight.s3.me-south-1.amazonaws.com',
//     ],
//   },
//   compress: true,
// };
// export default nextConfig;
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(process.cwd(), './'),
    };
    return config;
  },
  headers: async () => {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/_next/static/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/_next/image/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=604800, immutable',
            },
          ],
        },
        {
          source: '/scripts/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=3600, stale-while-revalidate=86400',
            },
          ],
        },
      ];
    }
    return [];
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    domains: ['api.dev.goods2load.com', 'api.goods2load.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'api.stage.goods2load.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'production-dubainight.s3.me-south-1.amazonaws.com',
      },
    ],
  },
  compress: true,
  async redirects() {
    return [
      {
        source: '/dashboard/atlas',
        destination: '/dashboard/freightforwardingcompany',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
