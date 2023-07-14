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

```
function App() {
  const [page, setPage] = useState<Page>({
    current: 1,
    size: 10,
    count: Math.ceil(resources.length / 10),
    total: resources.length,
  })
  const [data, setData] = useState<Resource[]>([])
  const [loading, setLoading] = useState(false)

  // This can be any async fetch function
  // This function is triggered my page change
  useMemo(() => {
    setLoading(true)
    setTimeout(() => {
      const data = resources.slice(
        (page.current - 1) * page.size,
        page.current * page.size,
      )
      setData(data)
      setLoading(false)
    }, 500)
  }, [page])

  const handleClick = (data: ClickData | undefined) => {
    console.log(data)
  }

  const handleUpdateDate = (date: MonthYear) => {
    console.log(date)
  }

  const handleSearch = (text: string) => {
    console.log(text)
  }

  const handlePageChange = (page: Page) => {
    setPage(page)
    console.log(page)
  }

  return (
    <div className='app'>
      <EventManager
        resources={data}
        tableId={1}
        page={page}
        searchable
        showLegend
        showTooltip
        loading={loading}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onClick={handleClick}
        onUpdateDate={handleUpdateDate}
      />
    </div>
  )
}
```

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
  label?: string
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
ID = number | string
```

```
Page = {
current: number
size: number
count: number
total: number
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
  hasWeekends
  searchable
  flat
  showLegend
  showTooltip
  loading={loading}
  onSearch={handleSearch}
  onClick={handleClick}
  onUpdateDate={handleUpdateDate}
/>
```

```
Props = {
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
```
