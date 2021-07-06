import { createObituary } from '../../../domain/obituary'
import obituaryProcessor from '../../crawlers/avaz/obituaryProcessor'
import getStubPath from '../../crawlers/helpers/readStub'
import usePuppeteer from '../../crawlers/helpers/usePuppeteer'

jest.setTimeout(100000)

describe('createItemProcessor', () => {
  const puppet = usePuppeteer()

  afterAll(async () => {
    const { teardown } = await puppet
    await teardown()
  })

  it('processes an item', async () => {
    const { goTo, page } = await puppet
    const path = getStubPath('oslobodjenje')

    await goTo(path)

    const items = await page.$$('.obituaryItem')

    const actual = await obituaryProcessor(items[0])

    expect(actual).toEqual(
      createObituary({
        firstname: 'Zlatici',
        surname: '',
        dateOfBirth: null,
        dateOfDeath: null,
        imgUrl:
          'https://cdn.oslobodjenje.ba/images/slike/2021/03/06/ob_media_79797-160.jpg',
        relative: 'Džana, Zijo, Arman i Dado',
      })
    )
  })
})
