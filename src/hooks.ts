import { Key, useEffect, useState } from 'react'
import { MonthYear, Resource, getDatesInRange, isWeekend } from '.'

export const useTimelineEffect = (
  resources: Resource[],
  monthYear: MonthYear,
  key: Key,
) => {
  useEffect(() => {
    resources.forEach((item) => {
      item.events.forEach((event) => {
        const range = getDatesInRange(event.start, event.end ?? event.start)
        range.forEach((day, index, array) => {
          const durationCell = document.getElementById(
            `${day.toDateString()}-${item.id}-${key}`,
          )
          if (durationCell) {
            durationCell.style.backgroundColor = event.color ?? ''
            durationCell.style.cursor = 'pointer'
            durationCell.style.boxShadow = '0 1px 0 0 rgba(0, 0, 0, 0.15)'
            if (index === 0) {
              durationCell.style.borderTopLeftRadius = '5px'
              durationCell.style.borderBottomLeftRadius = '5px'
            }
            if (index === array.length - 1) {
              durationCell.style.borderTopRightRadius = '5px'
              durationCell.style.borderBottomRightRadius = '5px'
            }
            if (isWeekend(day)) durationCell.style.opacity = '0.3'
            durationCell.textContent = JSON.stringify(item)
          }
        })
      })
    })
  }, [resources, monthYear])
}

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timerId)
    }
  }, [value, delay])

  return debouncedValue
}
