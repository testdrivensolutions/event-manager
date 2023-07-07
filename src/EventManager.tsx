import React, { useState } from 'react'
import {
  formatDate,
  getDaysInMonth,
  getYearAndMonth,
  useTimelineEffect,
  formatMonthYear,
  MonthYear,
  Props,
} from '.'
import styles from './styles.module.css'

export const EventManager: React.FC<Props> = ({
  resources,
  id,
  onClick,
  onUpdateDate,
}) => {
  const [monthYear, setMonthYear] = useState(getYearAndMonth())
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(monthYear))
  const hasWeekends = true

  useTimelineEffect(resources, monthYear, id)

  const handleBack = () => {
    let date
    if (monthYear.month <= 1) {
      date = { month: 12, year: monthYear.year - 1 }
    } else {
      date = { ...monthYear, month: monthYear.month - 1 }
    }
    updateDate(date)
  }

  const handleForward = () => {
    let date
    if (monthYear.month >= 12) {
      date = { month: 1, year: monthYear.year + 1 }
    } else {
      date = { ...monthYear, month: monthYear.month + 1 }
    }
    updateDate(date)
  }

  const handleToday = () => {
    updateDate()
  }

  const updateDate = (date: MonthYear = getYearAndMonth()) => {
    setMonthYear(date)
    setDaysInMonth(getDaysInMonth(date, hasWeekends))
    onUpdateDate(date)
  }

  const handleClick = (event: React.MouseEvent<HTMLTableCellElement>) => {
    let data
    const { textContent } = event.currentTarget
    if (textContent && typeof textContent === 'string') {
      data = JSON.parse(textContent)
    }
    onClick(data)
  }

  return (
    <>
      <div className={styles.timelineContainer}>
        <div className={styles.timelineHeadline}>
          <span className={styles.monthYear}>{formatMonthYear(monthYear)}</span>
          <div className={styles.timelineActions}>
            <button
              className={`${styles.btn} ${styles.btnBack}`}
              onClick={handleBack}
            >
              {'<'}
            </button>
            <button
              className={`${styles.btn} ${styles.today}`}
              onClick={handleToday}
            >
              Today
            </button>
            <button
              className={`${styles.btn} ${styles.forward}`}
              onClick={handleForward}
            >
              {'>'}
            </button>
          </div>
        </div>
        <table className={styles.timelineTable}>
          <thead>
            <tr>
              <th>&nbsp;</th>
              {daysInMonth.map((day) => (
                <th key={day.toDateString()}>{formatDate(day)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resources.map((item) => (
              <tr key={item.id} id={item.id}>
                <td id={item.title}>{item.title}</td>
                {daysInMonth.map((day) => (
                  <td
                    key={`${day.toDateString()}-${item.id}-${id}`}
                    id={`${day.toDateString()}-${item.id}-${id}`}
                    className={styles.eventCell}
                    onClick={handleClick}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
