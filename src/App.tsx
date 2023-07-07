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
        onClick={handleClick}
        onUpdateDate={handleUpdateDate}
      />
    </div>
  )
}

export default App
