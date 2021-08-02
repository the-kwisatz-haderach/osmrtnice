import { ICrawledObituary } from '../types'
import createObituary from './createObituary'

jest
  .spyOn(global, 'Date')
  .mockImplementation(() => ({ toISOString: () => 'someDate' } as any))

describe('createObituary', () => {
  it('creates an obituary with only required fields populated', () => {
    const date_of_birth = new Date(1234)
    const date_of_death = new Date(1234 + 1)

    const expected: Omit<ICrawledObituary, '_id'> = {
      date_crawled: 'someDate',
      firstname: 'Hello',
      surname: 'World',
      date_of_birth: date_of_birth.toString(),
      date_of_death: date_of_death.toString(),
      image: '',
      type: 'OBITUARY',
      long_text: '',
      middlename: '',
      relative: '',
    }
    expect(
      createObituary({
        type: 'OBITUARY',
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

    const expected: Omit<ICrawledObituary, '_id'> = {
      date_crawled: 'someDate',
      firstname: 'Hello',
      surname: 'World',
      date_of_birth: date_of_birth.toString(),
      date_of_death: date_of_death.toString(),
      image: 'testurl',
      type: 'GRATITUDE_DISPLAY',
      long_text: 'Some description',
      middlename: 'middlename',
      relative: 'relatives',
    }
    expect(
      createObituary({
        firstname: 'Hello',
        surname: 'World',
        date_of_birth: date_of_birth.toString(),
        date_of_death: date_of_death.toString(),
        type: 'GRATITUDE_DISPLAY',
        long_text: 'Some description',
        image: 'testurl',
        middlename: 'middlename',
        relative: 'relatives',
      })
    ).toEqual(expected)
  })
})
