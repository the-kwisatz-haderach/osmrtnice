function isUTCDate(str: string): boolean {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false
  const d = new Date(str)
  return d instanceof Date && !isNaN(d as any) && d.toUTCString() === str // valid date
}

export const formatDate = (timestamp: string, locale?: string): string => {
  try {
    if (isUTCDate(timestamp)) {
      return new Intl.DateTimeFormat(locale || navigator.language).format(
        Date.parse(timestamp)
      )
    }
    return ''
  } catch {
    return ''
  }
}
