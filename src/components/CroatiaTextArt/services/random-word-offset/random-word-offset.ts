export const randomWordOffset = (word: string) => {
  const randomIndex = Math.floor(Math.random() * word.length)

  return word.slice(randomIndex) + word.slice(0, randomIndex) + (Math.random() < 0.5 ? ' ' : '')
}
