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
import { Actions, EventCell, Legend, TextInput } from './components'

export const EventManager: React.FC<Props> = ({
  resources,
  tableId,
  hasWeekends = false,
  searchable = false,
  flat = false,
  showLegend = false,
  showTooltip = false,
  onSearch,
  onClick,
  onUpdateDate,
}) => {
  const [monthYear, setMonthYear] = useState(getYearAndMonth())
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(monthYear))

  const resourcesByEventTypes = useResourcesByEventTypes(resources)
  useTimelineEffect({
    resources: resourcesByEventTypes,
    monthYear,
    key: tableId,
    flat,
    showTooltip,
  })

  const updateDate = (date: MonthYear) => {
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
          <Actions monthYear={monthYear} onUpdate={updateDate} />
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
        {showLegend && <Legend resources={resources} />}
      </div>
    </>
  )
}
