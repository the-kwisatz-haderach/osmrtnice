import { Richtext } from 'storyblok-js-client'

export interface StoryblokAsset {
  alt?: string
  filename?: string
}
export interface IObituaryQuery {
  next?: string
  search?: string
  category?: string
  limit?: number
}

export type ObituarySymbol = 'cross' | 'rose'

export type ObituaryType =
  | 'in-memoriam'
  | 'obituary'
  | 'gratitude-display'
  | 'last-greetings'
  | 'thank-you'

export type FaithType = 'christian' | 'muslim'

export interface IObituary {
  _id: string
  storyId: number
  firstname: string
  surname: string
  name_misc?: string
  prefix?: string
  date_of_birth: string
  date_of_death: string
  image?: string | StoryblokAsset
  firstname_second?: string
  surname_second?: string
  image_second?: StoryblokAsset
  date_of_birth_second?: string
  date_of_death_second?: string
  type: ObituaryType
  long_text?: Richtext | string
  relative?: string
  city?: string
  size?: 'regular' | 'large'
  additional_information?: string
  preamble?: string
  date_created: string
  date_updated?: string
  faith?: FaithType
  is_crawled: boolean
  appreciations: number
  symbol_image?: StoryblokAsset
}
