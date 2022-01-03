import {
  createDetailPageNavigator,
  createPageNavigator,
} from '../../helpers/createPageNavigator'

export const nextPageNavigator = createPageNavigator(async (page) => {
  return await page.$('.ctis-load-more')
})

export const detailPageNavigator = createDetailPageNavigator(
  async (page) => await page.$$('article')
)
