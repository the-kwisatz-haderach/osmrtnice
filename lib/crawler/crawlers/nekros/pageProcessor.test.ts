import pageProcessor from './pageProcessor'
import getStubPath from '../helpers/readStub'
import obituaries from '../__stubs__/oslobodjenje'
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
    const path = getStubPath('oslobodjenje')

    await goTo(path)

    const actual = await pageProcessor(page)
    expect(actual).toEqual(obituaries)
  })
})
