import { ISbRichtext } from '@storyblok/react'

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

export type ObituarySymbol =
  | 'dove'
  | 'anchor'
  | 'atom'
  | 'star_of_david'
  | 'christian_cross'
  | 'moon_star'
  | 'orthodox_cross'
  | 'olive_branch'
  | 'rose'
  | 'red_star'

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
  long_text?: ISbRichtext | string
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

export interface ContactFormInput {
  firstname: string
  lastname: string
  phone: string
  mail: string
  message: string
  type: string
  symbol: string
  photo: File[]
}

export type TranslationsKey = keyof typeof import('../../public/static/locales/hr/common.json')
