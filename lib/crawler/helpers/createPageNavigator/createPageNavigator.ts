import { PageNavigatorFactory, DetailPageNavigatorFactory } from '../../types'

export const createPageNavigator: PageNavigatorFactory = (pageNavigator) => {
  return async (page) => {
    try {
      const element = await pageNavigator(page)

      if (element) {
        await Promise.all([page.waitForNavigation(), element.click()])
        return { success: true }
      }
      return { success: false }
    } catch (err) {
      await page.close()
      console.error('Page navigator error: ', err)
      return { success: false }
    }
  }
}

export const createDetailPageNavigator: DetailPageNavigatorFactory = (
  elementSelector
) => {
  let elementIndex = 0

  return async (page) => {
    try {
      const elements = await elementSelector(page)
      const currentElement = elements[elementIndex]
      if (currentElement) {
        const isClickable = await currentElement.evaluate(
          (node) => node.childNodes.length > 0
        )
        if (isClickable) {
          await Promise.all([page.waitForNavigation(), currentElement.click()])
          elementIndex += 1
          return { success: true, isLastElement: false }
        }
      }

      elementIndex = 0
      return { success: false, isLastElement: true }
    } catch (err) {
      await page.close()
      console.error('Detail page navigator error: ', err)
      elementIndex = 0
      return { success: false }
    }
  }
}
