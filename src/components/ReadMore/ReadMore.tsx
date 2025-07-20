import { useEffect, useRef, useState, type ReactNode } from 'react'

import './ReadMore.sass'
import { useWindowWidth } from '../../services/use-window-width/use-window-width'

export const ReadMore = ({ id, children }: { id: number; children: ReactNode }) => {
  const [totalHeight, setTotalHeight] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const readMoreWrapRef = useRef<HTMLElement | null>(null)
  const readMoreBlockRef = useRef<HTMLElement | null>(null)
  const windowWidth = useWindowWidth()

  useEffect(() => {
    readMoreWrapRef.current = document.querySelector(`#read-more-wrap-${id}`) as HTMLElement | null

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
      block.style.height = 'auto'
      block.style.position = 'absolute'
      block.style.transition = 'none'

      setTimeout(() => {
        if (block) {
          const height = block.scrollHeight

          if (height > 0) {
            setTotalHeight(height)
          }

          block.style.height = '0px'
          block.style.position = 'static'
          block.style.transition = 'height 0.5s ease'
        }
      }, 250)
    }
  }, [windowWidth, isOpen])

  useEffect(() => {
    if (isOpen && readMoreBlockRef.current) {
      readMoreBlockRef.current.classList.add('open')
      readMoreBlockRef.current.style.height = `${totalHeight}px`
      readMoreWrapRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })

      setTimeout(() => {
        if (readMoreBlockRef.current) {
          readMoreBlockRef.current.style.height = 'auto'
        }
      }, 500)
    }
  }, [isOpen, totalHeight])

  return (
    <>
      <div className='read-more-wrap' id={`read-more-wrap-${id}`}>
        {children}
        {readMoreBlockRef.current && (
          <a className='read-more-trigger' onClick={() => setIsOpen(true)}>
            {isOpen ? '' : 'više...'}
          </a>
        )}
      </div>
    </>
  )
}
