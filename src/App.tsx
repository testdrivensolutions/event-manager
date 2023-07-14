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

export default App
