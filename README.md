![build](https://github.com/jurisbandenieks/event-manager/actions/workflows/main.yml/badge.svg)

# React Timeline manager component

View and manage resources on a timeline

No dependancies used

## Installation

`npm install @event-manager/react`

## Usage

`import { EventManager } from '@event-manager/react'`

![alt text](https://github.com/jurisbandenieks/event-manager/blob/HEAD/images/event-manager.png)

- This component provides tools for firing events but does not handle data processing.
- It is the responsibility of the user to determine how to interact with the data during these events.

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
ClickData = {
  event: Event
  resourceId: string
}
```

```
handleClick(data: ClickData | undefined) => void
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
  onClick: (data: ClickData | undefined) => void
  onUpdateDate: (date: MonthYear) => void
}
```
