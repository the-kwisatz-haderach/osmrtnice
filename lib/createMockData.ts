import faker from 'faker'
import { IObituary } from './domain/types'

const between = (min: number, max: number): number =>
  min + Math.floor(Math.random() * max)

export const createObitary = (
  size: IObituary['size'] = 'regular'
): IObituary => ({
  size,
  firstname: faker.name.firstName(),
  middlename: faker.name.middleName(),
  surname: faker.name.lastName(),
  preamble: faker.lorem.lines(between(0, 3)) || undefined,
  relative: Array(between(0, 5))
    .fill(0)
    .map(() => faker.name.findName())
    .join(', '),
  date_of_birth: faker.date.past(between(50, 85)).toDateString(),
  date_of_death: faker.date.recent(2).toDateString(),
  additional_information: faker.lorem.lines(between(0, 4)) || undefined,
  image: 'picsum.photos/200/300',
  long_text: {
    content: [
      { type: 'paragraph', content: [faker.lorem.lines(between(1, 5))] },
    ],
  },
  type: 'OBITUARY',
})

export const createObituaries = (amount: number): IObituary[] =>
  Array(amount)
    .fill(0)
    .map((_, i) => createObitary(i % 6 === 0 ? 'large' : 'regular'))
