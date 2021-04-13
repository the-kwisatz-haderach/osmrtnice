export type MenuItem = {
  href: string
  label: string
}

export enum ObituaryType {
  IN_MEMORIAM = 'IN_MEMORIAM',
  OBITUARY = 'OBITUARY',
  GRATITUDE_DISPLAY = 'GRATITUDE_DISPLAY',
}

export type Obituary = {
  firstname: string
  middlename: string
  surname: string
  dateOfBirth: string | null
  dateOfDeath: string | null
  imgUrl: string
  type: ObituaryType
  description: string
  relative: string
}
