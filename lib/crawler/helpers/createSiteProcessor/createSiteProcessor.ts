import { SiteProcessorFactory } from '../../types'

const MAX_PAGES = 100

const createSiteProcessor: SiteProcessorFactory = (
  pageProcessor,
  nextListingNavigator,
  stopCondition,
  detailedListingNavigator
) => async (page) => {
  const allResults = []
  try {
    for (
      let pageIndex = 0;
      !stopCondition(allResults, pageIndex) && pageIndex <= MAX_PAGES;
      pageIndex += 1
    ) {
      if (!detailedListingNavigator) {
        const results = await pageProcessor(page)
        allResults.push(...results)
        const { success } = await nextListingNavigator(page)
        if (!success) {
          break
        } else {
          continue
        }
      }

      const { success, isLastElement } = await detailedListingNavigator(page)

      if (success) {
        const results = await pageProcessor(page)
        allResults.push(...results)
        await page.goBack()
        pageIndex -= 1
        continue
      }

      if (isLastElement) {
        const { success } = await nextListingNavigator(page)
        if (success) {
          continue
        }
      }

      break
    }
  } catch (err) {
    console.error(err)
  }

  return allResults
}

export default createSiteProcessor
