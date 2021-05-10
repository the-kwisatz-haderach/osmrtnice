export enum ObituaryType {
  IN_MEMORIAM = 'IN_MEMORIAM',
  OBITUARY = 'OBITUARY',
  GRATITUDE_DISPLAY = 'GRATITUDE_DISPLAY',
}

export interface Obituary {
  firstname: string
  middlename: string
  surname: string
  dateOfBirth: string | null
  dateOfDeath: string | null
  imgUrl: string
  type: ObituaryType
  description: string
  relative: string
  city: string
  size: 'regular' | 'large'
}
