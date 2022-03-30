/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
const env = {
    mongodburl: "Your MongoDB connection String",
}

module.exports = nextConfig || env
