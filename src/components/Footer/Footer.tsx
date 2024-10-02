import React, { ReactElement } from 'react'
import { Legend } from '../Legend'
import styles from './Footer.module.scss'

type Props = {
  legendItem: { [key: string]: string } | null
  pagination: ReactElement<HTMLDivElement> | null
  children: React.ReactNode
}

export const Footer = ({ legendItem, pagination, children }: Props) => (
  <div className={styles.footer}>
    {legendItem && <Legend legendItem={legendItem} />}
    {children}
    {pagination}
  </div>
)
