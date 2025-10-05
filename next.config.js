/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      {
        protocol: 'https',
        hostname: 'birlanewlaunch-gurgaon.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ssgroup-india.com',
      },
      {
        protocol: 'https',
        hostname: 'triverseadvertising.com',
      },
      {
        protocol: 'https',
        hostname: 'whitelandwestinresidencessector103.info',
      },
      {
        protocol: 'https',
        hostname: 'www.scoplots.co.in',
      },
      {
        protocol: 'https',
        hostname: 'scoplots.co.in',
      },
    ],
  },
}

module.exports = nextConfig