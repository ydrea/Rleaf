import { useEffect, useRef, useState, type ReactNode } from 'react'

import { useWindowWidth } from '../../services/use-window-width/use-window-width'
import { calculateElementHeightWithClone } from '../../services/calculate-element-height/calculate-element-height'
import './ReadMore.sass'

type Props = {
  id: number
  children: ReactNode
  onExpand?: (readMoreElement: HTMLElement) => void
}

export const ReadMore = ({ id, children, onExpand }: Props) => {
  const readMoreBlockRef = useRef<HTMLElement | null>(null)
  const [totalHeight, setTotalHeight] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const windowWidth = useWindowWidth()

  useEffect(() => {
    readMoreBlockRef.current = document.querySelector(
      `#read-more-wrap-${id} .read-more`
    ) as HTMLElement | null
  }, [id])

  useEffect(() => {
    if (isOpen) {
      return
    }

    const block = readMoreBlockRef.current

    if (block) {
      calculateElementHeightWithClone(block)
        .then((height) => {
          if (height > 0) {
            setTotalHeight(height)
          }

          block.style.height = '0px'
          block.style.transition = 'height 0.5s ease'
        })
        .catch(() => {
          block.style.height = 'auto'
          block.style.transition = 'none'

          setTimeout(() => {
            if (block) {
              const fallbackHeight = block.scrollHeight

              if (fallbackHeight > 0) {
                setTotalHeight(fallbackHeight)
              }

              block.style.height = '0px'
              block.style.transition = 'height 0.5s ease'
            }
          }, 100)
        })
    }
  }, [windowWidth, isOpen])

  useEffect(() => {
    if (isOpen && readMoreBlockRef.current) {
      readMoreBlockRef.current.classList.add('open')
      readMoreBlockRef.current.style.height = `${totalHeight}px`

      readMoreBlockRef.current.scrollIntoView({ behavior: 'smooth' })

      onExpand?.(readMoreBlockRef.current)

      setTimeout(() => {
        if (readMoreBlockRef.current) {
          readMoreBlockRef.current.style.height = 'auto'
          readMoreBlockRef.current.style.overflow = 'initial'
        }
      }, 1000)
    }
  }, [isOpen, totalHeight, onExpand])

  return (
    <>
      <div className='read-more-wrap' id={`read-more-wrap-${id}`}>
        {children}
        {readMoreBlockRef.current && !isOpen && (
          <a className='read-more-trigger' onClick={() => setIsOpen(true)}>
            više...
          </a>
        )}
      </div>
    </>
  )
}
