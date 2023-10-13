import { ObituaryType, ObituarySymbol } from './types'

export const SITE_NAME = 'Preminuli'

export const obituaryTypes: ObituaryType[] = [
  'obituary',
  'last-greetings',
  'thank-you',
  'in-memoriam',
]

export const obituarySymbols: Array<{
  type: ObituarySymbol
  imgSrc: string
}> = [
  { imgSrc: '/images/dove.png', type: 'dove' },
  { imgSrc: '/images/anchor.png', type: 'anchor' },
  { imgSrc: '/images/atom.png', type: 'atom' },
  { imgSrc: '/images/star_of_david.png', type: 'star_of_david' },
  { imgSrc: '/images/christian_cross.png', type: 'christian_cross' },
  { imgSrc: '/images/moon_star.png', type: 'moon_star' },
  { imgSrc: '/images/orthodox_cross.png', type: 'orthodox_cross' },
  { imgSrc: '/images/olive_branch.png', type: 'olive_branch' },
  { imgSrc: '/images/rose.png', type: 'rose' },
]

export const createMetaTitle = (...names: string[]) =>
  [SITE_NAME, ...names].join(' | ')
