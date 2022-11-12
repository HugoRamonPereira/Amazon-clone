// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
// };

// nextConfig;

module.exports = {
  images: {
    domains: ["fakestoreapi.com"],
  },
  env: {
    stripe_public_key: process.env.stripe_public_key,
  },
  images: {
    unoptimized: true,
  },
};
