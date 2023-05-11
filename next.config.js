const { PHASE_PRODUCTION_BUILD } = require('next/constants')
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
    ...(phase === PHASE_PRODUCTION_BUILD && {
      experimental: {
        workerThreads: true,
        cpus: 1,
      },
    }),
    async rewrites() {
      return Object.values(pathTranslations).flatMap((paths) =>
        Object.entries(paths).map(([destination, source]) => ({
          destination,
          source,
        }))
      )
    },
    images: {
      domains: ['picsum.photos', 'a.storyblok.com', 'www.osmrtnica.ba'],
    },
  }
  return withBundleAnalyzer(config)
}
