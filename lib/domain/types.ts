import { Richtext } from 'storyblok-js-client'

export type ObituaryType =
  | 'IN_MEMORIAM'
  | 'OBITUARY'
  | 'GRATITUDE_DISPLAY'
  | 'LAST_GREETINGS'

export interface IObituary {
  firstname: string
  surname: string
  middlename?: string
  date_of_birth: string
  date_of_death: string
  image?: string
  type: ObituaryType
  long_text?: Richtext | string
  relative?: string
  city?: string
  size?: 'regular' | 'large'
  additional_information?: string
  preamble?: string
}

export interface ICrawledObituary extends IObituary {
  _id: string
  date_crawled: string
}
export interface IObituaryInput {
  firstname: string
  middlename?: string
  surname: string
  date_of_birth: string
  date_of_death: string
  relative?: string
  long_text?: string
  image?: string
  type?: ObituaryType
}

export type Paginated<T> = T[]
