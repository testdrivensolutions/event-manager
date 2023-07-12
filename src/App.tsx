import React from 'react'
import { resources } from './data'
import { MonthYear, EventManager, ClickData } from './'

function App() {
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
        resources={resources}
        tableId={1}
        searchable
        showLegend
        onSearch={handleSearch}
        onClick={handleClick}
        onUpdateDate={handleUpdateDate}
      />
    </div>
  )
}

export default App
