export const formatDate = (timestamp: string, locales = 'en'): string => {
  try {
    return new Intl.DateTimeFormat(locales).format(new Date(timestamp))
  } catch {
    return ''
  }
}
