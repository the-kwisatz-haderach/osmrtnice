import { ElementHandle } from 'puppeteer'
import nameFormatter from '../../../../utils/nameFormatter/nameFormatter'
import { IObituaryInput } from '../../../domain/types'
import { createItemProcessor } from '../../helpers/createItemProcessor'
import { getElementProperty } from '../../helpers/getElementProperty'
import { getInnerText } from '../../helpers/getInnerText'
import { obituaryInputDefault } from '../common'

const getNames = async (root: ElementHandle): Promise<string[]> =>
  await getInnerText('h4.main-heading')(root).then((fullName) =>
    fullName.split(/\s+/)
  )

const obituaryProcessor = createItemProcessor<HTMLDivElement, IObituaryInput>(
  obituaryInputDefault,
  {
    firstname: async (root) =>
      await getNames(root)
        .then((names) => names[0])
        .then(nameFormatter),
    surname: async (root) =>
      await getNames(root)
        .then((names) => (names.length > 1 ? names.slice(-1)[0] : ''))
        .then(nameFormatter),
    middlename: async (root) =>
      await getNames(root)
        .then((names) => (names.length > 2 ? names[1] : ''))
        .then(nameFormatter),
    date_of_death: async (root) =>
      await root.$('.obituary-footer').then(getInnerText('p')),
    long_text: async (root) => {
      const handle = await root.$$('p')
      const text = await Promise.all(
        handle
          .slice(-3, -1)
          .map(async (handle) => await handle.evaluate((el) => el.innerText))
      )
      return text.join('\n')
    },
    image: getElementProperty('img', 'src'),
  }
)

export default obituaryProcessor
