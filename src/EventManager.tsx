import React, { useState } from 'react'
import {
  formatDate,
  getDaysInMonth,
  getYearAndMonth,
  useTimelineEffect,
  formatMonthYear,
  MonthYear,
  Props,
  isWeekend,
} from '.'
import styles from './styles.module.scss'

export const EventManager: React.FC<Props> = ({
  resources,
  tableId,
  hasWeekends = true,
  searchable = false,
  onSearch,
  onClick,
  onUpdateDate,
}) => {
  const [monthYear, setMonthYear] = useState(getYearAndMonth())
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(monthYear))

  useTimelineEffect(resources, monthYear, tableId)

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

  const inculdeWeekends = (day: Date): boolean => {
    if (hasWeekends) return true
    return !hasWeekends && !isWeekend(day)
  }

  return (
    <>
      <div className={styles.timelineContainer}>
        <div className={styles.timelineHeadline}>
          <span>{formatMonthYear(monthYear)}</span>
          <div className={styles.timelineActions}>
            <button className={`${styles.btn}`} onClick={handleBack}>
              {'<'}
            </button>
            <button className={`${styles.btn} `} onClick={handleToday}>
              Today
            </button>
            <button className={`${styles.btn} `} onClick={handleForward}>
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
                {daysInMonth.map((day) =>
                  inculdeWeekends(day) ? (
                    <td
                      key={`${day.toDateString()}-${item.id}-${tableId}`}
                      id={`${day.toDateString()}-${item.id}-${tableId}`}
                      className={styles.eventCell}
                      onClick={handleClick}
                    ></td>
                  ) : (
                    <></>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
