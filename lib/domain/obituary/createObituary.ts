import { IObituary, IObituaryInput } from '../types'

export default function createObituary(
  input: IObituaryInput
): Omit<IObituary, '_id'> {
  return {
    date_created: new Date().toISOString(),
    firstname: input.firstname,
    surname: input.surname,
    date_of_birth: input.date_of_birth,
    date_of_death: input.date_of_death,
    image: input.image ?? '',
    type: input.type ?? 'OBITUARY',
    middlename: input.middlename ?? '',
    relative: input.relative ?? '',
    long_text: input.long_text ?? '',
    appreciations: 0,
  }
}
