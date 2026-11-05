import type { ReactNode } from 'react'

import { useNumericId } from '../../services/use-numeric-id/use-numeric-id'
import { ReadMore } from '../ReadMore/ReadMore'
import { Container } from '../Container/Container'
import './Section.sass'

type Props = {
  children?: ReactNode
  dark?: boolean
  title?: string
  className?: string
  style?: React.CSSProperties
  noReadMore?: boolean
  thin?: boolean
}

export const Section = ({ children, dark, title, className, style, noReadMore, thin }: Props) => {
  const id = useNumericId()

  return (
    <Container className='container'>
      <section
        className={`${dark ? 'dark' : ''}${thin ? ' thin' : ''}${className ? ` ${className}` : ''}`}
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
