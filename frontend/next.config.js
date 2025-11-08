/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['tandabuionline.ac.tz'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_PRIMARY_COLOR: process.env.NEXT_PUBLIC_PRIMARY_COLOR,
    NEXT_PUBLIC_LOGO_URL: process.env.NEXT_PUBLIC_LOGO_URL,
    NEXT_PUBLIC_FAVICON_URL: process.env.NEXT_PUBLIC_FAVICON_URL,
    NEXT_PUBLIC_FONT_FAMILY: process.env.NEXT_PUBLIC_FONT_FAMILY,
  },
}

module.exports = nextConfig
