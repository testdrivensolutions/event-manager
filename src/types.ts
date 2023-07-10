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

export type ID = number | string

export type Props = {
  resources: Resource[]
  tableId: ID
  hasWeekends?: boolean
  searchable?: boolean
  flat?: boolean
  onSearch?: (text: string) => void
  onClick: (data: Resource | undefined) => void
  onUpdateDate: (date: MonthYear) => void
}
