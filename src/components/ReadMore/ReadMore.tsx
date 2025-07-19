import type { ReactNode } from 'react'

import './ReadMore.sass'

export const ReadMore = ({ id, children }: { id: number; children: ReactNode }) => {
  return (
    <>
      <input type='checkbox' className='read-more-state' id={`read-more-${id}`} />
      <div className='read-more-wrap'>
        {children}
        <label htmlFor={`read-more-${id}`} className='read-more-trigger'>
          više...
        </label>
      </div>
    </>
  )
}
