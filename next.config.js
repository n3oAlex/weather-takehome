/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [];
  },
  images: {
    domains: ["flagcdn.com", "openweathermap.org"],
  },
};

module.exports = nextConfig;
