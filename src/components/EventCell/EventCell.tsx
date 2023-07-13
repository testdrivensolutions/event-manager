import React from 'react'
import styles from './EventCell.module.scss'
import { ClickData, Resource } from '../../types'

type EventCellProps = {
  resource: Resource
  id: string
  onClick: (data: ClickData | undefined) => void
}

export const EventCell: React.FC<EventCellProps> = ({ id, onClick }) => {
  const handleClick = (event: React.MouseEvent<HTMLTableCellElement>) => {
    let data
    const { textContent } = event.currentTarget
    if (textContent && typeof textContent === 'string') {
      data = JSON.parse(textContent) as ClickData
    }
    onClick(data)
  }

  return <td id={id} className={styles.eventCell} onClick={handleClick}></td>
}

export default EventCell
