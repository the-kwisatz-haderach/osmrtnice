import handler from './pageProcessor'
import getStubPath from '../helpers/readStub'
import obituaries from '../__stubs__/avaz'
import usePuppeteer from '../helpers/usePuppeteer'

jest.setTimeout(100000)

describe('pageProcessor', () => {
  const puppet = usePuppeteer()

  afterAll(async () => {
    const { teardown } = await puppet
    await teardown()
  })

  it('parses a page', async () => {
    const { goTo, page } = await puppet
    const path = getStubPath('avaz_1')

    await goTo(path)

    const actual = await handler(page)
    expect(actual).toEqual(obituaries.avaz_1)
  })
  it('parses a second page', async () => {
    const { goTo, page } = await puppet
    const path = getStubPath('avaz_2')

    await goTo(path)

    const actual = await handler(page)
    expect(actual).toEqual(obituaries.avaz_2)
  })
  it('parses a third page', async () => {
    const { goTo, page } = await puppet
    const path = getStubPath('avaz_3')

    await goTo(path)

    const actual = await handler(page)
    expect(actual).toEqual(obituaries.avaz_3)
  })
})
