export const formatDate = (timestamp: string, locales = 'hr-HR'): string => {
  try {
    if (!timestamp) return ''
    const trimmed = timestamp.trim().replace(/\s+/, '')
    if (!trimmed) {
      return ''
    }
    const [day, month, year] = trimmed.match(/\d+/g).map(Number)
    const date = new Date()
    date.setDate(day)
    date.setMonth(month - 1)
    date.setFullYear(year)
    const formatted = new Intl.DateTimeFormat(locales).format(date)
    if (trimmed && !formatted) {
      return trimmed
    }
    return formatted
  } catch (err) {
    return ''
  }
}
