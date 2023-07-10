import React from 'react'
import { resources } from './data'
import { MonthYear, Resource, EventManager } from './'

function App() {
  const handleClick = (data: Resource | undefined) => {
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
        hasWeekends={false}
        searchable={true}
        onSearch={handleSearch}
        onClick={handleClick}
        onUpdateDate={handleUpdateDate}
      />

      <EventManager
        resources={resources}
        tableId={2}
        onClick={handleClick}
        onUpdateDate={handleUpdateDate}
        flat={true}
      />
    </div>
  )
}

export default App
