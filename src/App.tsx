import React, { useMemo, useState } from 'react'
import { resources } from './data'
import { MonthYear, EventManager, ClickData, Page, Resource } from './'

function App() {
  const [page, setPage] = useState<Page>({
    current: 1,
    size: 10,
    count: Math.ceil(resources.length / 10),
    total: resources.length,
  })
  const [data, setData] = useState<Resource[]>([])

  useMemo(() => {
    const data = resources.slice(
      (page.current - 1) * page.size,
      page.current * page.size,
    )
    setData(data)
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

  return (
    <div className='app'>
      <EventManager
        resources={data}
        tableId={1}
        page={page}
        searchable
        showLegend
        showTooltip
        onPageChange={setPage}
        onSearch={handleSearch}
        onClick={handleClick}
        onUpdateDate={handleUpdateDate}
      />
    </div>
  )
}

export default App
