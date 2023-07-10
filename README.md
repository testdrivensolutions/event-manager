![build](https://github.com/jurisbandenieks/event-manager/actions/workflows/main.yml/badge.svg)

# React Timeline manager component

View and manage resources on a timeline

No dependancies used

## Installation

`npm install @event-manager/react`

## Usage

`import { EventManager } from '@event-manager/react'`

![alt text](https://github.com/jurisbandenieks/event-manager/blob/HEAD/images/event-manager.png)

## Used Types

```
Event {
  start: Date
  end?: Date
  title: string
  color?: string
}
```

```
Resource {
  id: string
  title: string
  events: Event[]
}
```

```
MonthYear {
  month: number
  year: number
}
```

```
handleClick(data: Resource) => void
handleUpdateDate(data: MonthYear) => void
```

## Timeline Props

```
<EventManager
  resources={resources}
  tableId={1}
  hasWeekends={false}
  searchable={true}
  flat={true}
  onSearch={handleSearch}
  onClick={handleClick}
  onUpdateDate={handleUpdateDate}
/>
```

```
Props = {
  resources: Resource[]
  tableId: ID
  hasWeekends?: boolean
  searchable?: boolean
  flat?: boolean
  onSearch?: (text: string) => void
  onClick: (data: Resource | undefined) => void
  onUpdateDate: (date: MonthYear) => void
}
```
