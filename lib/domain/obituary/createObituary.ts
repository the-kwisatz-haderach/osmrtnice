import { obituaryIdGenerator } from '../../crawler/helpers/obituaryIdGenerator'
import { IObituary, IObituaryInput } from '../types'

export default function createObituary(input: IObituaryInput): IObituary {
  return {
    id: obituaryIdGenerator(input),
    firstname: input.firstname,
    surname: input.surname,
    date_of_birth: input.date_of_birth,
    date_of_death: input.date_of_death,
    image: input.image ?? '',
    type: input.type ?? 'OBITUARY',
    description: input.description ?? '',
    middlename: input.middlename ?? '',
    relative: input.relative ?? '',
  }
}
