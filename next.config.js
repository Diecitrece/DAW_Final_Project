/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
    // formats: ["image/avif", "image/webp", "image/jpg", "image/jpg"],
  },
};
const env = {
  mongodburl: "Your MongoDB connection String",
};

module.exports = nextConfig || env;
