const nameFormatter = (name: string): string => {
  const updated = name.replace(/([,.()]|\d|\s)+/g, '').toLowerCase()
  if (!updated) {
    return ''
  }
  return updated[0].toUpperCase() + updated.slice(1)
}

export default nameFormatter
