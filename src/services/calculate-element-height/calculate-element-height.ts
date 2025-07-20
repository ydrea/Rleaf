export const calculateElementHeightWithClone = (element: HTMLElement): Promise<number> => {
  return new Promise((resolve) => {
    const waitForFonts = (): Promise<void> => {
      if ('fonts' in document) {
        return document.fonts.ready.then(() => {})
      }

      // Fallback for browsers that don't support Font Loading API
      return new Promise((resolveFonts) => {
        setTimeout(resolveFonts, 100)
      })
    }

    const performMeasurement = () => {
      const originalHeight = element.style.height
      const originalMaxHeight = element.style.maxHeight
      const originalOverflow = element.style.overflow
      const originalTransition = element.style.transition
      const originalOpacity = element.style.opacity
      const originalPointerEvents = element.style.pointerEvents

      element.style.height = 'auto'
      element.style.maxHeight = 'none'
      element.style.overflow = 'visible'
      element.style.transition = 'none'
      element.style.opacity = '0'
      element.style.pointerEvents = 'none'

      // Force a reflow
      void element.offsetHeight

      const height = element.scrollHeight

      element.style.height = originalHeight
      element.style.maxHeight = originalMaxHeight
      element.style.overflow = originalOverflow
      element.style.transition = originalTransition
      element.style.opacity = originalOpacity
      element.style.pointerEvents = originalPointerEvents

      resolve(height)
    }

    waitForFonts().then(() => {
      requestAnimationFrame(performMeasurement)
    })
  })
}
