function isISOString(str: string): boolean {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false
  const d = new Date(str)
  return d instanceof Date && !isNaN(d as any) && d.toISOString() === str // valid date
}

function isStoryBlokDate(str: string): boolean {
  return /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(str)
}

interface Options extends Intl.DateTimeFormatOptions {
  locale?: string
}

export const formatDate = (
  timestamp: string,
  { locale, ...options }: Options = { locale: '' }
): string => {
  try {
    if (isISOString(timestamp) || isStoryBlokDate(timestamp)) {
      return new Intl.DateTimeFormat(
        locale || navigator.language,
        options
      ).format(Date.parse(timestamp))
    }
    return ''
  } catch {
    return ''
  }
}
