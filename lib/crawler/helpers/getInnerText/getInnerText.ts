import { ElementHandle } from 'puppeteer'

const getInnerText = (selector: string) => async (
  root: ElementHandle | null
): Promise<string> =>
  (await root
    ?.$(selector)
    .then(async (handle) => await handle?.evaluate((el) => el.innerText))) ??
  Promise.resolve('')

export default getInnerText
