import { ElementHandle } from 'puppeteer'
import nameFormatter from '../../../../utils/nameFormatter/nameFormatter'
import { IObituary } from '../../../domain/types'
import { createItemProcessor } from '../../helpers/createItemProcessor'
import { getElementProperty } from '../../helpers/getElementProperty'
import { getInnerText } from '../../helpers/getInnerText'
import { obituaryDefaults } from '../common'

const getNames = async (
  root: ElementHandle<HTMLDivElement>
): Promise<string[]> =>
  (await root
    .$('div.personPhoto')
    .then(getInnerText('h2'))
    .then((namesStr: string) => namesStr.split(/\s+/))) ?? []

const getDates = async (
  root: ElementHandle<HTMLDivElement>
): Promise<string[]> =>
  await root
    .$('div.personPhoto')
    .then(getInnerText('p'))
    .then((dateText: string) => dateText.split(/\D+/).filter((year) => year))

const obituaryProcessor = createItemProcessor<HTMLDivElement, IObituary>(
  obituaryDefaults,
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
    dateOfDeath: async (root) => await getDates(root).then((dates) => dates[1]),
    dateOfBirth: async (root) => await getDates(root).then((dates) => dates[0]),
    relative: getInnerText('.signature'),
    description: getInnerText('.maintext'),
    imgUrl: getElementProperty('img', 'src'),
  }
)

export default obituaryProcessor
