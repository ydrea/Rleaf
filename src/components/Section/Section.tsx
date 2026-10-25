import type { ReactNode } from 'react'

import { useNumericId } from '../../services/use-numeric-id/use-numeric-id'
import { ReadMore } from '../ReadMore/ReadMore'
import './Section.sass'
import { Container } from '../Container/Container'

type Props = {
  children?: ReactNode
  dark?: boolean
  title?: string
  className?: string
  style?: React.CSSProperties
  noReadMore?: boolean
}

export const Section = ({ children, dark, title, className, style, noReadMore }: Props) => {
  const id = useNumericId()

  return (
    <Container className='container'>
      <section
        className={`${dark ? 'dark' : ''}${className ? ` ${className}` : ''}`}
        style={style}
        id={`section-${id}`}
      >
        {title && <h2>{title}</h2>}
        <div className='section-content'>
          {!noReadMore && <ReadMore id={id}>{children}</ReadMore>}
          {noReadMore && children}
        </div>
      </section>
    </Container>
  )
}
