import { nextPageNavigator } from './pageNavigator'
import getStubPath from '../helpers/readStub'
import usePuppeteer from '../helpers/usePuppeteer'

jest.setTimeout(100000)

describe('pageNavigator', () => {
  const puppet = usePuppeteer()

  afterAll(async () => {
    const { teardown } = await puppet
    await teardown()
  })

  it('navigates from one page to another based on provided callback', async () => {
    const { goTo, page } = await puppet
    const path = getStubPath('oslobodjenje')

    await goTo(path)

    const actual = await nextPageNavigator(page)

    expect(actual.success).toBe(false)
  })
})
