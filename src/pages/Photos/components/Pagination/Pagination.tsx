import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import './Pagination.sass'

type Props = {
  totalPages: number
  top?: boolean
  spread?: number
}

export const Pagination = ({ totalPages, top, spread = 4 }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [clickedInThisPagination, setClickedInThisPagination] = useState(0)
  const clickedInThisPaginationRef = useRef(clickedInThisPagination)

  useEffect(() => {
    if (top) {
      return
    }

    if (clickedInThisPaginationRef.current === clickedInThisPagination) {
      return
    }

    clickedInThisPaginationRef.current = clickedInThisPagination

    const photosContainer = document.getElementById('photos-container')
    if (photosContainer) {
      photosContainer.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentPage, top, clickedInThisPagination])

  const handlePageChange = (page: number) => {
    setClickedInThisPagination((prev) => prev + 1)

    setSearchParams((params) => {
      params.set('page', page.toString())
      return params
    })
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className={`pagination ${top ? 'top' : ''}`}>
      {currentPage > 1 && (
        <div className='pagination-buttons-prev'>
          <>
            <button onClick={() => handlePageChange(1)}>&lt;&lt;</button>
            <button onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
          </>
        </div>
      )}

      <div className='pagination-pages'>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => {
          if (pageNumber >= currentPage - spread && pageNumber <= currentPage + spread) {
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={pageNumber === currentPage ? 'active' : ''}
              >
                {pageNumber}
              </button>
            )
          }
          return null
        })}
      </div>

      {currentPage < totalPages && (
        <div className='pagination-buttons-next'>
          <>
            <button onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
            <button onClick={() => handlePageChange(totalPages)}>&gt;&gt;</button>
          </>
        </div>
      )}
    </div>
  )
}
