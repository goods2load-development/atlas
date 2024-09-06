/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "api.dev.goods2load.com",
      "api.stage.goods2load.com",
      "lh3.googleusercontent.com",
      "production-dubainight.s3.me-south-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
