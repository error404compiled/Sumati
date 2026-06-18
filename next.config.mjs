/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      // Allow visiting the CMS without the index.html suffix in dev.
      { source: "/sanjuoliveteddy", destination: "/sanjuoliveteddy/index.html" },
    ];
  },
};

export default nextConfig;
