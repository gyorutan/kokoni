/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gyorutan-images.s3.ap-northeast-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
