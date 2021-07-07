import { PageProcessor } from '../../types'
import createSiteProcessor from './createSiteProcessor'

const mockPageProcessor = jest.fn(async () => [{ hello: 'world' }])
const mockNextPageNavigator = jest.fn(async () => ({ success: true }))
const mockStopCondition = jest.fn(
  (_: any[], pageIndex: number) => pageIndex === 3
)
const mockDetailedListingNavigator = jest.fn(async () => ({ success: true }))

xdescribe('createSiteProcessor', () => {
  const setup = (withDetailedListingNavigator = false): PageProcessor<any> =>
    createSiteProcessor(
      mockPageProcessor,
      mockNextPageNavigator,
      mockStopCondition,
      withDetailedListingNavigator ? mockDetailedListingNavigator : undefined
    )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns a function', () => {
    expect(
      createSiteProcessor(
        mockPageProcessor,
        mockNextPageNavigator,
        mockStopCondition
      )
    ).toEqual(expect.any(Function))
  })

  it('returns an array of results', async () => {
    const processor = setup()

    const results = await processor({} as any)

    expect(results).toEqual([
      { hello: 'world' },
      { hello: 'world' },
      { hello: 'world' },
    ])
  })

  describe('without a detailedListingNavigator', () => {
    it('runs the pageProcessor on the page to gather crawl results', async () => {
      const processor = setup()
      await processor({} as any)
      expect(mockPageProcessor).toHaveBeenCalledTimes(3)
    })
    it('runs the nextPageNavigator to visit the next page', async () => {
      const processor = setup()
      await processor({} as any)
      expect(mockNextPageNavigator).toHaveBeenCalledTimes(3)
    })
    it('processes the page until the stopCondition is true', async () => {
      const processor = setup()
      await processor({} as any)
      expect(mockStopCondition).toHaveBeenCalledTimes(4)
      expect(mockStopCondition).toHaveBeenLastCalledWith(
        [{ hello: 'world' }, { hello: 'world' }, { hello: 'world' }],
        3
      )
    })
  })

  describe('with a detailedListingNavigator', () => {
    it('runs the detailedListingNavigator before and the goBack function after processing the page', async () => {
      const processor = setup(true)
      const mockGoBack = jest.fn(async () => {})

      await processor({
        goBack: mockGoBack,
      } as any)

      expect(mockDetailedListingNavigator).toHaveBeenCalledTimes(3)
      expect(mockGoBack).toHaveBeenCalledTimes(3)
    })
  })

  describe('if the detailedListingNavigator is unsuccessful in navigation', () => {
    it('stops processing and returns the results', async () => {
      mockDetailedListingNavigator.mockResolvedValueOnce({ success: true })
      mockDetailedListingNavigator.mockResolvedValueOnce({ success: false })

      const processor = setup(true)
      const mockGoBack = jest.fn(async () => {})

      const results = await processor({
        goBack: mockGoBack,
      } as any)

      expect(results).toEqual([{ hello: 'world' }])
      expect(mockDetailedListingNavigator).toHaveBeenCalledTimes(2)
      expect(mockGoBack).toHaveBeenCalledTimes(1)
    })
  })

  describe('if the mockNextPageNavigator is unsuccessful in navigation', () => {
    it('stops processing and returns the results', async () => {
      mockNextPageNavigator.mockResolvedValueOnce({ success: true })
      mockNextPageNavigator.mockResolvedValueOnce({ success: false })

      const processor = setup(true)
      const mockGoBack = jest.fn(async () => {})

      const results = await processor({
        goBack: mockGoBack,
      } as any)

      expect(results).toEqual([{ hello: 'world' }, { hello: 'world' }])
      expect(mockNextPageNavigator).toHaveBeenCalledTimes(2)
    })
  })
})
