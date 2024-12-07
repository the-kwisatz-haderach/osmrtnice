const { i18n } = require('./next-i18next.config')
const { pathTranslations } = require('./pathTranslations')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = (phase, { defaultConfig }) => {
  /** @type {import('next').NextConfig} */
  const config = {
    ...defaultConfig,
    i18n,
    async headers() {
      return [
        {
          source: '/_next/image(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 's-maxage=86400, max-age=0',
            },
          ],
        },
        // {
        //   source: '/',
        //   headers: [
        //     {
        //       key: 'Permissions-Policy',
        //       value: 'web-share=*',
        //     },
        //   ],
        // },
      ]
    },
    async rewrites() {
      return Object.values(pathTranslations).flatMap((paths) =>
        Object.entries(paths).map(([destination, source]) => ({
          destination,
          source,
        }))
      )
    },
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          hostname: 'picsum.photos',
        },
        {
          hostname: 'www.osmrtnica.ba',
        },
        {
          hostname: 'a.storyblok.com',
        },
      ],
    },
  }
  return withBundleAnalyzer(config)
}
