function isIsoDate(str: string): boolean {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false
  const d = new Date(str)
  return d instanceof Date && !isNaN(d as any) && d.toISOString() === str // valid date
}

export const formatDate = (timestamp: string, locale?: string): string => {
  try {
    if (!timestamp) return ''
    if (isIsoDate(timestamp)) {
      return new Intl.DateTimeFormat(locale || navigator.language).format(
        Date.parse(timestamp)
      )
    }
    const trimmed = timestamp.trim().replace(/\s+/, '')
    if (!trimmed) {
      return ''
    }
    const [day, month, year] = trimmed.match(/\d+/g).map(Number)
    const date = new Date()
    date.setDate(day)
    date.setMonth(month - 1)
    date.setFullYear(year)
    const formatted = new Intl.DateTimeFormat(
      locale || navigator.language
    ).format(date)
    if (trimmed && !formatted) {
      return trimmed
    }
    return formatted
  } catch (err) {
    return ''
  }
}
