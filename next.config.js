if (process.env.NODE_ENV == 'development') {
  require('dotenv').config({ override: true }) // this is a hack but it works.
  // the bug is that an old dotenv is somehow loading these values first, and then the new dotenv is not overriding them
  // old dotenv might be coming from @next/env or whatever builtin shit nextjs is doing
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
        },
      ],
    })
    return config
  },
  // TODO: We need to check if we need to restrict certain domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
