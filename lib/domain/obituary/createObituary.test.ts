import { IObituary } from '../types'
import createObituary from './createObituary'

jest
  .spyOn(global, 'Date')
  .mockImplementation(() => ({ toISOString: () => 'someDate' } as any))

describe('createObituary', () => {
  it('creates an obituary with only required fields populated', () => {
    const date_of_birth = new Date(1234)
    const date_of_death = new Date(1234 + 1)

    const expected: Omit<IObituary, '_id'> = {
      date_created: 'someDate',
      firstname: 'Hello',
      surname: 'World',
      date_of_birth: date_of_birth.toString(),
      date_of_death: date_of_death.toString(),
      image: '',
      type: 'obituary',
      long_text: '',
      middlename: '',
      relative: '',
      is_crawled: true,
    }
    expect(
      createObituary({
        type: 'obituary',
        firstname: 'Hello',
        surname: 'World',
        date_of_birth: date_of_birth.toString(),
        date_of_death: date_of_death.toString(),
      })
    ).toEqual(expected)
  })
  it('creates an obituary with all fields populated', () => {
    const date_of_birth = new Date(1234)
    const date_of_death = new Date(1234 + 1)

    const expected: Omit<IObituary, '_id'> = {
      date_created: 'someDate',
      firstname: 'Hello',
      surname: 'World',
      date_of_birth: date_of_birth.toString(),
      date_of_death: date_of_death.toString(),
      image: 'testurl',
      type: 'gratitude-display',
      long_text: 'Some description',
      middlename: 'middlename',
      relative: 'relatives',
      is_crawled: true,
    }
    expect(
      createObituary({
        firstname: 'Hello',
        surname: 'World',
        date_of_birth: date_of_birth.toString(),
        date_of_death: date_of_death.toString(),
        type: 'gratitude-display',
        long_text: 'Some description',
        image: 'testurl',
        middlename: 'middlename',
        relative: 'relatives',
      })
    ).toEqual(expected)
  })
})
