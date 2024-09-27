import React, { useEffect, useState } from 'react'
import { getDaysInMonth, getYearAndMonth, Props, formatMonthYear } from '.'
import styles from './styles.module.scss'
import { Actions, Loading, Footer, EventTable } from './components'

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
  datePicker = null,
  pagination = null,
  actionsPosition = 'top',
  noDataText = 'No data',
  dateFromPicker = null,
  onClick,
  onUpdateDate,
}) => {
  const [monthYear, setMonthYear] = useState(getYearAndMonth())
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(monthYear))

  useEffect(() => {
    if (datePicker && dateFromPicker) {
      setDaysInMonth(getDaysInMonth(dateFromPicker, hasWeekends))
      setMonthYear(dateFromPicker)
    } else {
      setDaysInMonth(getDaysInMonth(monthYear, hasWeekends))
      onUpdateDate(monthYear)
    }
  }, [monthYear, hasWeekends, dateFromPicker])

  const renderActions = datePicker ? (
    datePicker
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
      <div className={styles.timelineHeadline}>
        {actionsPosition === 'top' && renderActions}
        <div className={styles.spacer}></div>
        {search}
      </div>

      {loading ? (
        <Loading />
      ) : resources.length > 0 ? (
        <EventTable
          resources={resources}
          title={title ?? formatMonthYear(monthYear)}
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
          <div>{formatMonthYear(monthYear)}</div>
          <div>{noDataText}</div>
        </div>
      )}

      <Footer
        resources={resources}
        pagination={pagination}
        showLegend={showLegend}
      >
        {actionsPosition === 'bottom' && renderActions}
      </Footer>
    </div>
  )
}
