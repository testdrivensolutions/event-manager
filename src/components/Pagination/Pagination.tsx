import React from 'react'
import styles from './Pagination.module.scss'
import { Page } from '../../types'

type Props = {
  page: Page
  maxLength?: number
  onPageChange: (page: Page) => void
}

export const Pagination: React.FC<Props> = ({
  page,
  maxLength = 5,
  onPageChange,
}) => {
  const lengthChoices = [5, 10, 25, 50, 100]

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > page.count) {
      return
    }
    onPageChange({ ...page, current: pageNumber })
  }

  const renderPages = () => {
    const pages = []

    let startPage = Math.max(1, page.current - Math.floor(maxLength / 2))
    let endPage = Math.min(page.count, startPage + maxLength - 1)
    // Adjust startPage and endPage if there are fewer pages than visiblePages
    if (endPage - startPage + 1 < maxLength) {
      startPage = Math.max(1, endPage - maxLength + 1)
    }

    // Add page numbers to the array
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // Add the last page
    if (endPage < page.count) {
      pages.push(page.count)
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

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = Number(e.target.value) ?? 10

    onPageChange({
      ...page,
      count: Math.ceil(page.total / size),
      size,
    })
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.navigation}>
        <b onClick={() => handlePageChange(page.current - 1)}>{'<'}</b>
        {renderPages()}
        <b onClick={() => handlePageChange(page.current + 1)}>{'>'}</b>
      </div>

      <div className={styles.select}>
        <select
          className={styles.selectText}
          id='lengthSelect'
          value={page.size}
          onChange={handleSizeChange}
        >
          {lengthChoices.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className={styles.selectHighlight}></span>
        <span className={styles.selectBar}></span>
        <label className={styles.selectLabel}>Items per page</label>
      </div>
    </div>
  )
}
