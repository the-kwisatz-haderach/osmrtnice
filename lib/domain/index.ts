import { ObituaryType, ObituarySymbol } from './types'

export const SITE_NAME = 'Preminuli'

export const obituaryTypes: ObituaryType[] = [
  'obituary',
  'last-greetings',
  'thank-you',
  'in-memoriam',
]

export const obituarySymbols: ObituarySymbol[] = [
  'dove',
  'anchor',
  'atom',
  'star_of_david',
  'christian_cross',
  'moon_star',
  'orthodox_cross',
  'olive_branch',
  'rose',
]

export const createMetaTitle = (...names: string[]) =>
  [SITE_NAME, ...names].join(' | ')
