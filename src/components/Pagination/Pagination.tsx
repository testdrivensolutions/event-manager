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

    const min = Math.min(maxLength, page.total)

    for (let i = 1; i <= min; i++) {
      pages.push(i)
    }

    if (pages.length < page.total) {
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
