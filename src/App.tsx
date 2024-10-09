import React, { useMemo, useState } from 'react'
import { TextField, TablePagination, Button } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { resources } from './data'
import { EventManager, ClickData, Page, Resource, getYearAndMonth } from './'
import { NonNullablePickerChangeHandler } from '@mui/x-date-pickers/internals/hooks/useViews'

const App = () => {
  const [page, setPage] = useState<Page>({
    current: 0,
    size: 10,
    count: Math.ceil(resources.length / 10),
    total: resources.length,
  })
  const [data, setData] = useState<Resource[]>([])
  const [monthYear, setMonthYear] = useState<Date>(getYearAndMonth())
  const [loading, setLoading] = useState(false)
  const [hasWeekends, setHasWeekends] = useState(true)

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
  }, [page, monthYear])

  const handleClick = (data: ClickData | undefined) => {
    console.log(data)
  }

  const handleUpdateDate = (date: Date) => {
    console.log(date)
    setMonthYear(date)
  }

  const handleSearch = (text: string) => {
    console.log(text)
  }

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setPage({ ...page, current: newPage })
  }
  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPage({ ...page, size: Number(e.target.value) })
  }

  const handleDateChange = (
    value: NonNullablePickerChangeHandler<Date> | null,
    keyboardInputValue?: string,
  ) => {
    if (value) setMonthYear(value as unknown as Date)
  }

  return (
    <div className='app'>
      <Button onClick={() => setHasWeekends(!hasWeekends)}>
        Weekend toggle
      </Button>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={monthYear}
          label={'"year" and "month"'}
          views={['year', 'month']}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='outlined'
              inputProps={{ ...params.inputProps, readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin='dense'
              size='small'
            />
          )}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
      <EventManager
        resources={data}
        tableId={1}
        search={
          <TextField
            variant='standard'
            label='Search'
            sx={{
              padding: '0 0 24px',
            }}
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
        actionsPosition='top'
        legendItem={{
          pending: '#FFD54F',
          approved: '#81C784',
          rejected: '#FFAB91',
          expired: '#9E9E9E',
          default: '#000',
        }}
        showTooltip
        hasWeekends={hasWeekends}
        date={monthYear}
        loading={loading}
        onClick={handleClick}
      />
    </div>
  )
}

export default App
