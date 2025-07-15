import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import './Pagination.sass'

type Props = {
  totalPages: number
  top?: boolean
  spread?: number
}

export const Pagination = ({ totalPages, top, spread = 5 }: Props) => {
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

  return (
    <div className={`pagination ${top ? 'top' : ''}`}>
      {currentPage > 1 && <button onClick={() => handlePageChange(1)}>&lt;&lt;</button>}

      {currentPage > 1 && <button onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>}

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => {
        if (
          pageNumber >= currentPage - spread &&
          pageNumber <= currentPage + spread &&
          pageNumber !== 0
        ) {
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

      {currentPage < totalPages && (
        <button onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
      )}

      {currentPage < totalPages && (
        <button onClick={() => handlePageChange(totalPages)}>&gt;&gt;</button>
      )}
    </div>
  )
}
