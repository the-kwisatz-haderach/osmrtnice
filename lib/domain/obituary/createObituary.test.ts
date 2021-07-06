import createObituary from './createObituary'
import { Obituary, ObituaryType } from './types'

describe('createObituary', () => {
  it('creates an obituary with only required fields populated', () => {
    const dateOfBirth = new Date(Date.now())
    const dateOfDeath = new Date(Date.now() + 1)

    const expected: Obituary = {
      firstname: 'Hello',
      surname: 'World',
      dateOfBirth: dateOfBirth.toString(),
      dateOfDeath: dateOfDeath.toString(),
      imgUrl: '',
      type: ObituaryType.OBITUARY,
      description: '',
      middlename: '',
      relative: ''
    }
    expect(
      createObituary({
        firstname: 'Hello',
        surname: 'World',
        dateOfBirth: dateOfBirth.toString(),
        dateOfDeath: dateOfDeath.toString()
      })
    ).toEqual(expected)
  })
  it('creates an obituary with all fields populated', () => {
    const dateOfBirth = new Date(Date.now())
    const dateOfDeath = new Date(Date.now() + 1)

    const expected: Obituary = {
      firstname: 'Hello',
      surname: 'World',
      dateOfBirth: dateOfBirth.toString(),
      dateOfDeath: dateOfDeath.toString(),
      imgUrl: 'testurl',
      type: ObituaryType.GRATITUDE_DISPLAY,
      description: 'Some description',
      middlename: 'middlename',
      relative: 'relatives'
    }
    expect(
      createObituary({
        firstname: 'Hello',
        surname: 'World',
        dateOfBirth: dateOfBirth.toString(),
        dateOfDeath: dateOfDeath.toString(),
        type: ObituaryType.GRATITUDE_DISPLAY,
        description: 'Some description',
        imgUrl: 'testurl',
        middlename: 'middlename',
        relative: 'relatives'
      })
    ).toEqual(expected)
  })
})
