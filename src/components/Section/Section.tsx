import type { ReactNode } from 'react'

import './Section.sass'

type Props = {
  children?: ReactNode
  dark?: boolean
  title?: string
  className?: string
  style?: React.CSSProperties
}

export const Section = ({ children, dark, title, className, style }: Props) => (
  <section className={`${dark ? 'dark' : ''}${className ? ` ${className}` : ''}`} style={style}>
    {title && <h2>{title}</h2>}
    <div className='section-content'>{children}</div>
  </section>
)
