// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
// };

// nextConfig;

module.exports = {
  experimental:{
    appDir: true
  },
  images: {
    domains: ['fakestoreapi.com'],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  }
};
