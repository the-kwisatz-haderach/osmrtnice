export const formatDate = (timestamp: string, locales = 'hr-HR'): string => {
  try {
    const trimmed = timestamp.trim()
    if (!trimmed) {
      return ''
    }
    const formatted = new Intl.DateTimeFormat(locales).format(new Date(trimmed))
    if (trimmed && !formatted) {
      return trimmed
    }
    return formatted
  } catch {
    return ''
  }
}
