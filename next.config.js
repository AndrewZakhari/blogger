/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains: ["avatars.githubusercontent.com", "cdn.discordapp.com"]
  }
}

module.exports = nextConfig
