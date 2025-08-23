export const parseExifDate = (value: string | number | undefined) => {
  if (!value) {
    return undefined
  }
  if (typeof value === 'string' && value.length === 8) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`
  }
  try {
    const d = new Date(value)
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
  } catch {
    return undefined
  }
}
