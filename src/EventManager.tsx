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
  useResourcesByEventTypes,
} from '.'
import styles from './styles.module.scss'
import { EventCell } from './components/EventCell'
import { Legend } from './components/Legend'
import { TextInput } from './components/TextInput'

export const EventManager: React.FC<Props> = ({
  resources,
  tableId,
  hasWeekends = false,
  searchable = false,
  flat = false,
  showLegend = false,
  onSearch,
  onClick,
  onUpdateDate,
}) => {
  const [monthYear, setMonthYear] = useState(getYearAndMonth())
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(monthYear))

  const resourcesByEventTypes = useResourcesByEventTypes(resources)
  useTimelineEffect(resourcesByEventTypes, monthYear, tableId, flat)

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

  const inculdeWeekends = (day: Date): boolean => {
    if (hasWeekends) return true
    return !hasWeekends && !isWeekend(day)
  }

  return (
    <>
      <div
        className={styles.timelineContainer}
        id={`${tableId} timeline-container`}
      >
        <div className={styles.timelineHeadline}>
          {searchable && <TextInput onSearch={onSearch} />}
          <div>{formatMonthYear(monthYear)}</div>
          <div className={styles.timelineActions}>
            <button className={styles.btn} onClick={handleBack}>
              {'<'}
            </button>
            <button className={styles.btn} onClick={handleToday}>
              Today
            </button>
            <button className={styles.btn} onClick={handleForward}>
              {'>'}
            </button>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.timelineTable}>
            <thead>
              <tr>
                <th>&nbsp;</th>
                {daysInMonth.map(
                  (day) =>
                    inculdeWeekends(day) && (
                      <th key={day.toDateString()}>{formatDate(day)}</th>
                    ),
                )}
              </tr>
            </thead>
            <tbody>
              {resourcesByEventTypes.map((item) => (
                <tr key={item.id} id={item.id}>
                  <td id={item.title}>{item.title}</td>
                  {daysInMonth.map((day) => {
                    return (
                      inculdeWeekends(day) && (
                        <EventCell
                          key={`${day.toDateString()}-${item.id}-${tableId}`}
                          id={`${day.toDateString()}-${item.id}-${tableId}`}
                          resource={item}
                          onClick={onClick}
                        ></EventCell>
                      )
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showLegend && <Legend />}
      </div>
    </>
  )
}
