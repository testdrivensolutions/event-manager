![build](https://github.com/jurisbandenieks/event-manager/actions/workflows/main.yml/badge.svg)

# React Timeline manager component

View and manage resources on a timeline

No dependancies used

## Used Types

`Event {
  start: Date
  end?: Date
  title: string
  color?: string
}`

`Resource {
  id: string
  title: string
  events: Event[]
}`

`MonthYear {
  month: number
  year: number
}`

`handleClick(data: Resource) => void
handleUpdateDate(data: MonthYear) => void`

## Timeline Props

`<Timeline
  resources={resources}
  onClick={handleClick}
  onUpdateDate={handleUpdateDate}
/>`
