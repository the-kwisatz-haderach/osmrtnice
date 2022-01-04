const { i18n } = require('./next-i18next.config')
const { pathTranslations } = require('./pathTranslations')

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
]

module.exports = {
  i18n,
  async headers() {
    return process.env.NODE_ENV === 'development'
      ? []
      : [
          {
            // Apply these headers to all routes in your application.
            source: '/(.*)',
            headers: securityHeaders,
          },
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
    domains: [
      'picsum.photos',
      'a.storyblok.com',
      'cdn.oslobodjenje.ba',
      'digital.avaz.ba',
      'www.nekros.info',
      'www.osmrtnica.ba',
    ],
  },
}
