import { ElementHandle } from 'puppeteer-core'
import nameFormatter from '../../../../utils/nameFormatter/nameFormatter'
import { IObituaryInput } from '../../../domain/types'
import { createItemProcessor } from '../../helpers/createItemProcessor'
import { getElementProperty } from '../../helpers/getElementProperty'
import { getInnerText } from '../../helpers/getInnerText'
import { obituaryInputDefault } from '../common'

const getNames = async (
  root: ElementHandle<HTMLDivElement>
): Promise<string[]> =>
  (await getInnerText('.title2')(root).then((namesStr: string) =>
    namesStr.split(/\s+/)
  )) ?? []

const getDates = async (
  root: ElementHandle<HTMLDivElement>
): Promise<string[]> =>
  await root
    .$$('div')
    .then((elements) => elements[5]?.evaluate((el) => el.textContent))
    .then((dates) => dates.split(/\s+-\s+/))

const getLongText = async (
  root: ElementHandle<HTMLDivElement>
): Promise<string> =>
  await root
    .$$('p')
    .then((elements) =>
      elements.map((element) => element?.evaluate((el) => el.textContent))
    )
    .then((text) => text.join('\n'))

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
    date_of_birth: async (root) =>
      await getDates(root).then((dates) => dates[0]),
    date_of_death: async (root) =>
      await getDates(root).then((dates) => dates[1]),
    long_text: getLongText,
    image: getElementProperty('img.okvir', 'src'),
  }
)

export default obituaryProcessor
