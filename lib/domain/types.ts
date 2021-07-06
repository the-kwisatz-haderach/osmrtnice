import { Richtext } from 'storyblok-js-client'

export type ObituaryType = 'IN_MEMORIAM' | 'OBITUARY' | 'GRATITUDE_DISPLAY'

export interface IObituary extends Record<string, any> {
  firstname: string
  surname: string
  middlename?: string
  date_of_birth: string
  date_of_death: string
  image?: string
  type: ObituaryType
  long_text?: Richtext
  relative?: string
  city?: string
  size?: 'regular' | 'large'
  id: string
  additional_information?: string
  preamble?: string
}

export interface IObituaryInput extends Record<string, any> {
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
