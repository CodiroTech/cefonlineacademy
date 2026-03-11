import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/uploads/**',
      },
    ],
  },

  async redirects() {
    return [
      { source: '/contact', destination: '/contact-us', permanent: true },
      { source: '/about/vissionMissionValues', destination: '/about-us', permanent: true },
      { source: '/about/whyChooseUs', destination: '/why-choose-cef', permanent: true },
    ]
  },
};

export default nextConfig;
