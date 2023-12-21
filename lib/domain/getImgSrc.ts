import { IObituary } from './types'

export const getImgSrc = (img: IObituary['image']): string =>
  typeof img === 'string' ? img : img?.filename
