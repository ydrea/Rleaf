export const decodeString = (value: string) => {
  try {
    return decodeURIComponent(escape(value))
  } catch {
    //
  }
  return value
}
