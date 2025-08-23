const imageCache = new Map<string, ReturnType<typeof createImageResource>>()

const createImageResource = (src: string) => {
  let status = 'pending'
  let result: string | Event

  const img = new Image()
  img.src = src

  // Check if image is already cached and loaded
  if (img.complete) {
    // If it's loaded successfully
    status = 'success'
    result = src
  } else {
    const promise = new Promise((resolve, reject) => {
      img.onload = () => {
        status = 'success'
        result = src
        resolve(src)
      }
      img.onerror = (err) => {
        status = 'error'
        result = err
        reject(err)
      }
    })

    return {
      read() {
        if (status === 'pending') {
          throw promise
        } else if (status === 'error') {
          throw result
        } else {
          return result
        }
      }
    }
  }

  return {
    read() {
      return result
    }
  }
}

export const getImageResource = (src: string) => {
  if (!imageCache.has(src)) {
    imageCache.set(src, createImageResource(src))
  }

  return imageCache.get(src)
}
