import { ReactElement } from 'react'

export type Resource = {
  id: string
  title: string
  label?: string
  events: Event[]
}

export type Event = {
  start: Date
  end?: Date
  title: string
  color?: string
}

export type MonthYear = {
  month: number
  year: number
}

export type ClickData = {
  event: Event
  resourceId: string
}

export type ID = number | string

export type Page = {
  current: number
  size: number
  count: number
  total: number
}

export type Props = {
  resources: Resource[]
  tableId: ID
  hasWeekends?: boolean // default false
  flat?: boolean // default false
  showTooltip?: boolean // default false
  loading?: boolean // default false
  multiLine?: boolean // default true
  search?: ReactElement<HTMLInputElement>
  date?: Date
  headline?: ReactElement<HTMLDivElement>
  pagination?: ReactElement<HTMLDivElement>
  title?: string
  legendItem?: { [key: string]: string }
  actionsPosition?: 'top' | 'bottom' // default 'top'
  noDataText?: string // default 'No data'
  onClick?: (data: ClickData | undefined) => void
}
