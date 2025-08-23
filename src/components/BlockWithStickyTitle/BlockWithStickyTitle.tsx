import type { ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
// @ts-expect-error react-stickynode is not typed
import Sticky from 'react-stickynode'

import { Flex } from '../Flex/Flex'
import { ReadMore } from '../ReadMore/ReadMore'
import { Container } from '../Container/Container'
import { useNumericId } from '../../services/use-numeric-id/use-numeric-id'
import { useWindowWidth } from '../../services/use-window-width/use-window-width'
import './BlockWithStickyTitle.sass'

type Props = {
  title: string
  children?: ReactNode
  subtitle?: ReactNode
  subtitleMargin?: string
}

export const BlockWithStickyTitle = ({ title, subtitle, subtitleMargin, children }: Props) => {
  const id = useNumericId()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [stickyEnabled, setStickyEnabled] = useState(true)
  const windowWidth = useWindowWidth()

  useEffect(() => {
    if (windowWidth <= 768) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      setStickyEnabled(false)
      return
    }

    if (stickyEnabled) {
      return
    }

    setStickyEnabled(false)

    timeoutRef.current = setTimeout(() => {
      setStickyEnabled(true)
    }, 1000)
  }, [windowWidth, stickyEnabled])

  const handleExpand = useCallback(() => {
    setStickyEnabled(false)

    setTimeout(() => {
      setStickyEnabled(true)
    }, 250)
  }, [])

  return (
    <Flex className='block-with-sticky-title'>
      <Flex flex={1} direction='column' justifyContent='space-between'>
        <Sticky enabled={stickyEnabled} top={32} bottomBoundary={`#break-${id}`}>
          <h1>{title}</h1>
        </Sticky>

        <div>
          <Container id={`break-${id}`} h={1} mb={32} className='block-with-sticky-title-break' />
          {subtitle && (
            <div
              className='block-with-sticky-title-subtitle'
              style={{ marginRight: subtitleMargin }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </Flex>

      <div className='block-with-sticky-title-content'>
        <ReadMore id={id} onExpand={handleExpand}>
          {children}
        </ReadMore>
      </div>
    </Flex>
  )
}
