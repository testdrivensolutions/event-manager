import React, { useEffect, useState } from 'react'
import { getDaysInMonth, getYearAndMonth, Props, formatMonthYear } from '.'
import styles from './styles.module.scss'
import { Actions, Loading, Footer, EventTable } from './components'

export const EventManager: React.FC<Props> = ({
  resources,
  tableId,
  hasWeekends = false,
  flat = false,
  showTooltip = false,
  multiLine = true,
  title = null,
  loading = false,
  headline = null,
  pagination = null,
  actionsPosition = 'top',
  noDataText = 'No data',
  date,
  legendItem = null,
  onClick,
}) => {
  const [monthYear, setMonthYear] = useState(getYearAndMonth())
  const [dateTitle, setDateTitle] = useState(title)
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(monthYear))

  useEffect(() => {
    setDaysInMonth(getDaysInMonth(date, hasWeekends))
    setDateTitle(formatMonthYear(date))
  }, [hasWeekends, date])

  const renderActions = headline ? (
    headline
  ) : (
    <Actions
      monthYear={monthYear}
      onUpdate={(date) => setMonthYear(new Date(date))}
    />
  )

  return (
    <div
      className={styles.timelineContainer}
      id={`${tableId} timeline-container`}
    >
      {loading ? (
        <Loading />
      ) : resources.length > 0 ? (
        <EventTable
          resources={resources}
          title={dateTitle}
          daysInMonth={daysInMonth}
          monthYear={monthYear}
          hasWeekends={hasWeekends}
          tableId={tableId}
          flat={flat}
          multiLine={multiLine}
          showTooltip={showTooltip}
          onClick={onClick}
        />
      ) : (
        <div className={styles.noData}>
          <div>
            <h3>{dateTitle}</h3>
            <div>{noDataText}</div>
          </div>
        </div>
      )}

      <Footer legendItem={legendItem} pagination={pagination}>
        {actionsPosition === 'bottom' && renderActions}
      </Footer>
    </div>
  )
}
