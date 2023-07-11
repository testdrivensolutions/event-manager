import { Event, Resource, addDays } from './'

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const generateResources = (): Resource[] => {
  const resources: Resource[] = []

  for (let i = 1; i <= 100; i++) {
    const resource: Resource = {
      id: i.toString(),
      title: `Resource ${i}`,
      events: [],
    }

    const eventCount = getRandomInt(1, 5)

    for (let j = 0; j < eventCount; j++) {
      const start = addDays(new Date(), getRandomInt(-20, 10))
      const end = addDays(start, getRandomInt(1, 24))
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
      const title = `Event ${j + 1}`

      const event: Event = {
        start,
        end,
        color,
        title,
      }

      resource.events.push(event)
    }

    resources.push(resource)
  }

  return resources
}

// Call the generateResources function to get the array of 100 resources
export const resources: Resource[] = generateResources()
