import { SiteProcessorFactory } from '../../types'

const createSiteProcessor: SiteProcessorFactory = (
  pageProcessor,
  nextListingNavigator,
  stopCondition,
  detailedListingNavigator,
  maxPages = 100
) => async (page) => {
  const allResults = []
  try {
    for (
      let pageIndex = 0;
      !stopCondition(allResults, pageIndex) && pageIndex <= maxPages;
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
