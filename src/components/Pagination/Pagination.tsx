import React from 'react'
import styles from './Pagination.module.scss'
import { Page, Resource } from '../../types'

type Props = {
  resources: Resource[]
  page: Page
  maxLength?: number
  onPageChange: (page: Page) => void
}

export const Pagination: React.FC<Props> = ({
  page,
  maxLength = 5,
  onPageChange,
}) => {
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > page.total) {
      return
    }
    onPageChange({ ...page, current: pageNumber })
  }

  const renderPages = () => {
    const pages = []

    let startPage = Math.max(1, page.current - Math.floor(maxLength / 2))
    let endPage = Math.min(page.total, startPage + maxLength - 1)
    // Adjust startPage and endPage if there are fewer pages than visiblePages
    if (endPage - startPage + 1 < maxLength) {
      startPage = Math.max(1, endPage - maxLength + 1)
    }

    // Add page numbers to the array
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // Add the last page
    if (endPage < page.total) {
      pages.push(page.total)
    }

    return pages.map((p) => (
      <span
        key={p}
        className={p === page.current ? styles.active : ''}
        onClick={() => handlePageChange(p)}
      >
        {p}
      </span>
    ))
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.navigation}>
        <b onClick={() => handlePageChange(page.current - 1)}>{'<'}</b>
        {renderPages()}
        <b onClick={() => handlePageChange(page.current + 1)}>{'>'}</b>
      </div>
    </div>
  )
}
