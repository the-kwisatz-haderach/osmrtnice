import { Richtext } from 'storyblok-js-client'

export enum ObituaryType {
  IN_MEMORIAM = 'IN_MEMORIAM',
  OBITUARY = 'OBITUARY',
  GRATITUDE_DISPLAY = 'GRATITUDE_DISPLAY',
}

export interface IObituary {
  firstname: string
  surname: string
  middlename?: string
  date_of_birth: string
  date_of_death: string
  image?: string
  type: ObituaryType
  long_text: Richtext
  relative?: string
  city?: string
  size?: 'regular' | 'large'
  id: string
  additional_information?: string
  preamble?: string
}
