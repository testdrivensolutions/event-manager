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
        color: '#E69C',
        title: 'Sick',
      },
      {
        start: addDays(new Date(), -1),
        end: addDays(new Date(), 1),
        color: '#000',
        title: 'Leave',
      },
    ],
  },
  {
    id: '3',
    title: 'Moe Lester',
    events: [
      {
        start: addDays(new Date(), 1),
        end: addDays(new Date(), 2),
        color: '#C3df',
        title: 'Sick',
      },
    ],
  },
]
