const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'hr',
    locales: ['hr'],
    ...(typeof window === 'undefined'
      ? { localePath: path.resolve('./public/locales') }
      : {}),
  },
}
