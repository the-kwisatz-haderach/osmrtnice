import { Obituary, ObituaryInput, ObituaryType } from './types'

export default function createObituary(input: ObituaryInput): Obituary {
  return {
    firstname: input.firstname,
    surname: input.surname,
    dateOfBirth: input.dateOfBirth,
    dateOfDeath: input.dateOfDeath,
    imgUrl: input.imgUrl ?? '',
    type: input.type ?? ObituaryType.OBITUARY,
    description: input.description ?? '',
    middlename: input.middlename ?? '',
    relative: input.relative ?? '',
  }
}
