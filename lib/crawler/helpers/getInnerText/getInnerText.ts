import { ElementHandle } from 'puppeteer-core'

const getInnerText = (selector: string) => async (
  root: ElementHandle | null
): Promise<string> =>
  (await root
    ?.$(selector)
    .then(async (handle) => await handle?.evaluate((el) => el.textContent))) ??
  (await Promise.resolve(''))

export default getInnerText
