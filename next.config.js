/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    customKey: "6595ade44214c7d003f435c0",
  },
  images: {
    domains: ["randomuser.me"],
  },
};

module.exports = nextConfig;
