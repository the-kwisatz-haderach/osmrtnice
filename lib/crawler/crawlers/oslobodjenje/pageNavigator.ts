import { createPageNavigator } from '../../helpers/createPageNavigator'

export const nextPageNavigator = createPageNavigator(async (page) => {
  const elements = await page.$$('.Pagination-item')
  return elements.slice(-2)[0]
})
