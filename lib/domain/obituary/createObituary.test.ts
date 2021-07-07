import { IObituary } from '../types'
import createObituary from './createObituary'

describe('createObituary', () => {
  it('creates an obituary with only required fields populated', () => {
    const date_of_birth = new Date(Date.now())
    const date_of_death = new Date(Date.now() + 1)

    const expected: IObituary = {
      id: expect.any(String),
      firstname: 'Hello',
      surname: 'World',
      date_of_birth: date_of_birth.toString(),
      date_of_death: date_of_death.toString(),
      image: '',
      type: 'OBITUARY',
      description: '',
      middlename: '',
      relative: '',
    }
    expect(
      createObituary({
        firstname: 'Hello',
        surname: 'World',
        date_of_birth: date_of_birth.toString(),
        date_of_death: date_of_death.toString(),
      })
    ).toEqual(expected)
  })
  it('creates an obituary with all fields populated', () => {
    const date_of_birth = new Date(Date.now())
    const date_of_death = new Date(Date.now() + 1)

    const expected: IObituary = {
      id: expect.any(String),
      firstname: 'Hello',
      surname: 'World',
      date_of_birth: date_of_birth.toString(),
      date_of_death: date_of_death.toString(),
      image: 'testurl',
      type: 'GRATITUDE_DISPLAY',
      description: 'Some description',
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
        description: 'Some description',
        image: 'testurl',
        middlename: 'middlename',
        relative: 'relatives',
      })
    ).toEqual(expected)
  })
})
