import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
// @ts-expect-error react-stickynode is not typed
import Sticky from 'react-stickynode'
import { useViewportSize } from '@mantine/hooks'

import { Flex } from '../Flex/Flex'
import { Container } from '../Container/Container'
import './BlockWithStickyTitle.sass'

type Props = {
  title: string
  children?: ReactNode
  subtitle?: ReactNode
  subtitleMargin?: string
}

let id = 0

export const BlockWithStickyTitle = ({ title, subtitle, subtitleMargin, children }: Props) => {
  id++
  const [stickyEnabled, setStickyEnabled] = useState(true)
  const viewport = useViewportSize()

  useEffect(() => {
    if (viewport.width < 768) {
      setStickyEnabled(false)
      return
    }

    if (stickyEnabled) {
      return
    }

    setStickyEnabled(false)

    setTimeout(() => {
      setStickyEnabled(true)
    }, 1000)
  }, [viewport.width, stickyEnabled])

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
        <div>{children}</div>
      </div>
    </Flex>
  )
}
