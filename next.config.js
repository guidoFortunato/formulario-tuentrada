/** @type {import('next').NextConfig} */


const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eventos.tuentrada.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "api.tuentrada.com",
      },
      {
        protocol: "https",
        hostname: "testapi.tuentrada.com",
      },
    ],
  },
};

module.exports = nextConfig
