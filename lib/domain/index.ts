import { ObituaryType } from './types'

export const SITE_NAME = 'Preminuli'

export const obituaryTypes: ObituaryType[] = [
  'gratitude-display',
  'in-memoriam',
  'last-greetings',
  'obituary',
]

export const createMetaTitle = (...names: string[]) =>
  [SITE_NAME, ...names].join(' | ')
