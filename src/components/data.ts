import { Resource, addDays } from './'

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Tony Stark',
    events: [
      {
        start: new Date(),
        end: addDays(new Date(), 5),
        color: '#E6EE9C',
        title: 'Vacation',
      },
    ],
  },
  {
    id: '2',
    title: 'Bruce Banner',
    events: [
      {
        start: addDays(new Date(), -5),
        end: addDays(new Date(), 10),
        color: '#E6EE9C',
        title: 'Sick',
      },
    ],
  },
]
