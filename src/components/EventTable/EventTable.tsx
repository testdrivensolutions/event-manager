import React from 'react'
import styles from './EventTable.module.scss'
import { EventCell } from '../EventCell'
import { ClickData, MonthYear, Resource } from '../../types'
import { formatDate, isWeekend } from '../../utils'
import { useResourcesByEventTypes, useTimelineEffect } from '../../hooks'

type Props = {
  title: string | null
  monthYear: MonthYear
  daysInMonth: Date[]
  resources: Resource[]
  hasWeekends: boolean
  tableId: number | string
  multiLine: boolean
  flat: boolean
  showTooltip: boolean
  onClick?: (data: ClickData | undefined) => void
}

export const EventTable = ({
  title,
  monthYear,
  daysInMonth,
  resources,
  hasWeekends,
  tableId,
  multiLine,
  flat,
  showTooltip,
  onClick,
}: Props) => {
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

  const inculdeWeekends = (day: Date): boolean => {
    if (hasWeekends) return true
    return !hasWeekends && !isWeekend(day)
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.timelineTable}>
        <thead>
          <tr>
            <th>{title}</th>
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
  )
}
