import { ObituaryType } from './types'

export const SITE_NAME = 'Preminuli'

export const obituaryTypes: ObituaryType[] = [
  'obituary',
  'last-greetings',
  'thank-you',
  'in-memoriam',
]

export const createMetaTitle = (...names: string[]) =>
  [SITE_NAME, ...names].join(' | ')
