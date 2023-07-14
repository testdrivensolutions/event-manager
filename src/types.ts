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
  page: Page
  hasWeekends?: boolean // default false
  searchable?: boolean // default false
  flat?: boolean // default false
  showLegend?: boolean // default false
  showTooltip?: boolean // default false
  loading?: boolean // default false
  onPageChange: (page: Page) => void
  onSearch?: (text: string) => void
  onClick: (data: ClickData | undefined) => void
  onUpdateDate: (date: MonthYear) => void
}
