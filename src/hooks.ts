import { Key, useEffect, useMemo, useState } from 'react'
import { Event, Resource, getDatesInRange, isWeekend } from '.'
import { createTooltip } from './components'

type TimelineProps = {
  resources: Resource[]
  monthYear: Date
  key: Key
  flat: boolean
  showTooltip: boolean
}

export const useTimelineEffect = ({
  resources,
  monthYear,
  key,
  flat,
  showTooltip,
}: TimelineProps) => {
  useEffect(() => {
    if (flat) {
      const eventTable = document.getElementById(`${key} timeline-container`)
      if (eventTable) eventTable.style.boxShadow = 'none'
    }

    resources.forEach((item) => {
      item.events.forEach((event) => {
        const range = getDatesInRange(event.start, event.end ?? event.start)
        range.forEach((eventDay, index, array) => {
          const durationCell = document.getElementById(
            `${eventDay.toDateString()}-${item.id}-${key}`,
          )
          if (durationCell) {
            durationCell.classList.add('duration-cell')
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
            // if (isWeekend(eventDay)) durationCell.style.opacity = '0.3'
            const eventData = {
              event,
              resourceId: item.id.split('-')[0],
            }

            durationCell.textContent = JSON.stringify(eventData)
            if (showTooltip) {
              createTooltip(durationCell, { label: item.label ?? '', event })
            }
          }
        })
      })
    })
  }, [monthYear, resources])
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

export const useResourcesByEventTypes = ({
  resources,
  multiLine,
}: {
  resources: Resource[]
  multiLine: boolean
}): Resource[] => {
  const [resourcesByEventTypes, setResourcesByEventTypes] = useState<
    Resource[]
  >([])

  if (!multiLine) return resources

  useMemo(() => {
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
          label: resource.title,
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
