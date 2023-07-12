export type Resource = {
  id: string
  title: string
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

export type Props = {
  resources: Resource[]
  tableId: ID
  hasWeekends?: boolean // default false
  searchable?: boolean // default false
  flat?: boolean // default false
  showLegend?: boolean // default false
  onSearch?: (text: string) => void
  onClick: (data: ClickData | undefined) => void
  onUpdateDate: (date: MonthYear) => void
}
