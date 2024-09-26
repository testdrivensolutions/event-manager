import React from 'react'
import styles from './Actions.module.scss'
import { getYearAndMonth } from '../../utils'
import back from '../../assets/navigate_before.svg'
import next from '../../assets/navigate_next.svg'

type Props = {
  monthYear: Date
  onUpdate: (date: Date) => void
}

export const Actions: React.FC<Props> = ({ monthYear, onUpdate }) => {
  const handleBack = () => {
    let date
    if (monthYear.getMonth() <= 0) {
      date = new Date(`${monthYear.getFullYear()}/12/1`)
    } else {
      date = new Date(`${monthYear.getFullYear()}/${monthYear.getMonth()}/1`)
    }
    onUpdate(date)
  }

  const handleForward = () => {
    let date
    if (monthYear.getMonth() >= 11) {
      date = new Date(`${monthYear.getFullYear() + 1}/1/1`)
    } else {
      date = new Date(
        `${monthYear.getFullYear()}/${monthYear.getMonth() + 2}/1`,
      )
    }
    onUpdate(date)
  }

  const handleToday = () => {
    onUpdate(getYearAndMonth())
  }

  return (
    <div className={styles.timelineActions}>
      <button className={styles.btn} onClick={handleBack}>
        <img src={back} alt='<' />
      </button>
      <button className={styles.btn} onClick={handleToday}>
        Today
      </button>
      <button className={styles.btn} onClick={handleForward}>
        <img src={next} alt='<' />
      </button>
    </div>
  )
}
