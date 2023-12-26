/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    serverActions: true
  },
  reactStrictMode: true,
  images: {
    domains: ["eventos.tuentrada.com", "picsum.photos", "testapi.tuentrada.com"],
  },
};

