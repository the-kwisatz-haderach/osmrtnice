import { ICrawledObituary } from '../types'

export default function createObituary(
  input: Omit<ICrawledObituary, '_id' | 'date_crawled'>
): Omit<ICrawledObituary, '_id'> {
  return {
    date_crawled: new Date().toISOString(),
    firstname: input.firstname,
    surname: input.surname,
    date_of_birth: input.date_of_birth,
    date_of_death: input.date_of_death,
    image: input.image ?? '',
    type: input.type ?? 'OBITUARY',
    middlename: input.middlename ?? '',
    relative: input.relative ?? '',
    long_text: input.long_text ?? '',
  }
}
