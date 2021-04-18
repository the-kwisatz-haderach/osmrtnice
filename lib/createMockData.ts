import faker from 'faker'
import { Props as ObituaryProps } from '../components/Obituary'

const between = (min: number, max: number) =>
  min + Math.floor(Math.random() * max)

export const createObitary = (
  size: ObituaryProps['size'] = 'regular'
): ObituaryProps & { id: number | string } => ({
  size,
  id: faker.datatype.number(1000),
  name: faker.name.findName(),
  personalMessage: faker.lorem.lines(between(0, 3)) || undefined,
  preamble: faker.lorem.lines(between(0, 2)) || undefined,
  relations: Array(between(0, 5))
    .fill(0)
    .map(() => faker.name.findName()),
  dateOfBirth: faker.date.past(between(50, 85)).toDateString(),
  dateOfDeath: faker.date.recent(2).toDateString(),
  additionalInformation: faker.lorem.lines(between(0, 4)) || undefined,
  imgSrc: 'https://picsum.photos/200/300',
})

export const createObituaries = (amount: number) =>
  Array(amount)
    .fill(0)
    .map((_, i) => createObitary(i % 6 === 0 ? 'large' : 'regular'))
