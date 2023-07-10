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

  return (
    <div className='app'>
      <EventManager
        resources={resources}
        tableId={1}
        hasWeekends={false}
        onClick={handleClick}
        onUpdateDate={handleUpdateDate}
      />

      <EventManager
        resources={resources}
        tableId={2}
        onClick={handleClick}
        onUpdateDate={handleUpdateDate}
      />
    </div>
  )
}

export default App
