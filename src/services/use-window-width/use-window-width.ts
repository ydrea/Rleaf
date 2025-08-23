import { useCallback, useEffect } from 'react'
import { useDebouncedState } from '@mantine/hooks'

export const useWindowWidth = () => {
  const [width, setWidth] = useDebouncedState(window.innerWidth, 250)

  const handleResize = useCallback(() => setWidth(window.innerWidth), [setWidth])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [handleResize])

  return width
}
