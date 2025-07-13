import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import Sticky from 'react-stickynode'

import { Flex } from '../Flex/Flex'
import { Container } from '../Container/Container'
import './BlockWithStickyTitle.sass'

type Props = {
  title: string
  subtitle?: string
  subtitleMargin?: string
  children: ReactNode
}

let id = 0

export const BlockWithStickyTitle = ({ title, subtitle, subtitleMargin, children }: Props) => {
  id++
  const [resized, setResized] = useState(0)
  const [stickyEnabled, setStickyEnabled] = useState(true)

  useEffect(() => {
    if (!setStickyEnabled) {
      return
    }

    setStickyEnabled(false)

    setTimeout(() => {
      setStickyEnabled(true)
    }, 1000)
  }, [resized])

  useEffect(() => {
    const resizeHandler = () => setResized((value) => value + 1)
    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return (
    <Flex className='block-with-sticky-title'>
      <Flex flex={1} direction='column' justifyContent='space-between'>
        <Sticky enabled={stickyEnabled} top={32} bottomBoundary={`#break-${id}`}>
          <h1>{title}</h1>
        </Sticky>

        <div>
          <Container id={`break-${id}`} h={1} mb={32} />
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
