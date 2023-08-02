import React, { useEffect, useState } from 'react'
import {
  formatDate,
  getDaysInMonth,
  getYearAndMonth,
  useTimelineEffect,
  Props,
  isWeekend,
  useResourcesByEventTypes,
  formatMonthYear,
} from '.'
import styles from './styles.module.scss'
import { Actions, EventCell, Legend, Loading } from './components'

export const EventManager: React.FC<Props> = ({
  resources,
  tableId,
  hasWeekends = false,
  flat = false,
  showLegend = false,
  showTooltip = false,
  multiLine = true,
  title = null,
  loading = false,
  search = null,
  pagination = null,
  actionsPossition = 'top',
  noDataText = 'No data',
  onClick,
  onUpdateDate,
}) => {
  const [monthYear, setMonthYear] = useState(getYearAndMonth())
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(monthYear))

  const resourcesByEventTypes = useResourcesByEventTypes({
    resources,
    multiLine,
  })
  useTimelineEffect({
    resources: resourcesByEventTypes,
    monthYear,
    key: tableId,
    flat,
    showTooltip,
  })

  useEffect(() => {
    setDaysInMonth(getDaysInMonth(monthYear, hasWeekends))
    onUpdateDate(monthYear)
  }, [monthYear])

  const inculdeWeekends = (day: Date): boolean => {
    if (hasWeekends) return true
    return !hasWeekends && !isWeekend(day)
  }

  const renderActions = (
    <Actions monthYear={monthYear} onUpdate={(date) => setMonthYear(date)} />
  )

  return (
    <div
      className={styles.timelineContainer}
      id={`${tableId} timeline-container`}
    >
      <div className={styles.timelineHeadline}>
        {search}
        {actionsPossition === 'top' && renderActions}
      </div>

      {loading ? (
        <Loading />
      ) : resources.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.timelineTable}>
            <thead>
              <tr>
                <th>{title ?? formatMonthYear(monthYear)}</th>
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
      ) : (
        <div className={styles.noData}>{noDataText}</div>
      )}

      <div className={styles.footer}>
        {showLegend && <Legend resources={resources} />}
        {actionsPossition === 'bottom' && renderActions}
        {pagination}
      </div>
    </div>
  )
}
