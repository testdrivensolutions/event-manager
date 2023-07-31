![build](https://github.com/jurisbandenieks/event-manager/actions/workflows/main.yml/badge.svg)

![StackBlitz](https://stackblitz.com/edit/event-manager-react)

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

### Example

```
import React, { useMemo, useState } from 'react'
import { resources } from './data'
import { MonthYear, EventManager, ClickData, Page, Resource } from './'

// These components can be anything that you want
import { TextField } from '@mui/material'
import { TablePagination } from '@mui/material'

function App() {
  const [page, setPage] = useState<Page>({
    current: 0,
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
        page.current * page.size,
        (page.current + 1) * page.size,
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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setPage({ ...page, current: newPage })
  }
  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPage({ ...page, size: Number(e.target.value) })
  }

  return (
    <div className='app'>
      <EventManager
        resources={data}
        tableId={1}
        search={
          <TextField
            variant='standard'
            label='Search'
            onChange={(e) => handleSearch(e.target.value)}
          />
        }
        pagination={
          <TablePagination
            component='div'
            count={page.total}
            page={page.current}
            onPageChange={handleChangePage}
            rowsPerPage={page.count}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        }
        showLegend
        showTooltip
        hasWeekends
        loading={loading}
        onClick={handleClick}
        onUpdateDate={handleUpdateDate}
      />
    </div>
  )
}

export default App
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
  resources={data}
  tableId={1}
  search={
    <TextField
      variant='standard'
      label='Search'
      onChange={(e) => handleSearch(e.target.value)}
    />
  }
  pagination={
    <TablePagination
      component='div'
      count={page.total}
      page={page.current}
      onPageChange={handleChangePage}
      rowsPerPage={page.count}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  }
  showLegend
  showTooltip
  hasWeekends
  loading={loading}
  onClick={handleClick}
  onUpdateDate={handleUpdateDate}
/>
```

```
Props = {
  resources: Resource[]
  tableId: ID
  hasWeekends?: boolean // default false
  flat?: boolean // default false
  showLegend?: boolean // default false
  showTooltip?: boolean // default false
  loading?: boolean // default false
  // slots
  search?: ReactElement<HTMLInputElement>
  pagination?: ReactElement<HTMLDivElement>
  //events
  onClick: (data: ClickData | undefined) => void
  onUpdateDate: (date: MonthYear) => void
}
```
