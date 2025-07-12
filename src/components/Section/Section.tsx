import type { ReactNode } from 'react'

import './Section.sass'

type Props = {
  children: ReactNode
  dark?: boolean
  title?: string
  className?: string
}

export const Section = ({ children, dark, title, className }: Props) => (
  <section className={`${dark ? 'dark' : ''}${className ? ` ${className}` : ''}`}>
    {title && <h2>{title}</h2>}
    <div className='section-content'>{children}</div>
  </section>
)
