import React, { ReactElement } from 'react'
import styles from './Footer.module.scss'
import { Legend } from '../Legend'
import { Resource } from '../../types'

type Props = {
  resources: Resource[]
  showLegend: boolean
  pagination: ReactElement<HTMLDivElement> | null
  children: React.ReactNode
}

export const Footer = ({
  resources,
  showLegend,
  pagination,
  children,
}: Props) => {
  return (
    <div className={styles.footer}>
      {showLegend && <Legend resources={resources} />}
      {children}
      {pagination}
    </div>
  )
}
