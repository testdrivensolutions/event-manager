import { Key, useEffect, useState } from 'react'
import { Event, MonthYear, Resource, getDatesInRange, isWeekend } from '.'

export const useTimelineEffect = (
  resources: Resource[],
  monthYear: MonthYear,
  key: Key,
  flat: boolean,
) => {
  useEffect(() => {
    if (flat) {
      const eventTable = document.getElementById(`${key} timeline-container`)
      if (eventTable) eventTable.style.boxShadow = 'none'
    }

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
            const eventData = {
              event,
              resourceId: item.id.split('-')[0],
            }
            durationCell.textContent = JSON.stringify(eventData)
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

export const useResourcesByEventTypes = (resources: Resource[]): Resource[] => {
  const [resourcesByEventTypes, setResourcesByEventTypes] = useState<
    Resource[]
  >([])

  useEffect(() => {
    const newMappedResources = resources.flatMap((resource) => {
      const eventsByType: {
        [title: string]: { title: string; events: Event[] }
      } = {}
      const mappedEvents: Resource[] = []

      for (const event of resource.events) {
        if (event.title in eventsByType) {
          eventsByType[event.title].events.push(event)
        } else {
          eventsByType[event.title] = { title: event.title, events: [event] }
        }
      }

      let suffix = 1
      for (const type in eventsByType) {
        const uniqueId = `${resource.id}-${suffix}` // Generate a unique identifier
        mappedEvents.push({
          id: uniqueId,
          title: suffix === 1 ? resource.title : '',
          events: eventsByType[type].events,
        })
        suffix++
      }

      return mappedEvents
    })

    setResourcesByEventTypes(newMappedResources)
  }, [resources])

  return resourcesByEventTypes
}
