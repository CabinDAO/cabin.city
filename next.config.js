const isDevEnv = process.env.NODE_ENV === 'development'

if (isDevEnv) {
  // this is a hack but it works
  require('dotenv').config({ override: true })
  require('dotenv').config({ path: '.env.local', override: true })
  require('dotenv').config({ path: '.env.fauna.local', override: true })
  // console.log(process.env)

  // the bug is that an old dotenv is somehow loading these values first, and then the new dotenv is not overriding them
  // old dotenv might be coming from @next/env or whatever builtin shit nextjs is doing
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  swcMinify: !isDevEnv,
  // compress: !isDevEnv,
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
    return {
      ...config,
      // optimization: {
      //   minimize: !isDevEnv,
      // },
    }
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

if (isDevEnv) {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
  module.exports = withBundleAnalyzer(nextConfig)
} else {
  module.exports = nextConfig
}
