/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {hostname: '**.googleusercontent.com'},
      {hostname: '**.githubusercontent.com'}
    ]
  }
}

module.exports = nextConfig
