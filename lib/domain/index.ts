import { ObituaryType, ObituarySymbol } from './types'

export const SITE_NAME = 'Preminuli'

export const obituaryTypes: ObituaryType[] = [
  'obituary',
  'last-greetings',
  'thank-you',
  'in-memoriam',
]

export const obituarySymbols: ObituarySymbol[] = ['cross', 'rose']

export const createMetaTitle = (...names: string[]) =>
  [SITE_NAME, ...names].join(' | ')
