import {
  createPageNavigator,
  createDetailPageNavigator,
} from '../../helpers/createPageNavigator'

export const nextPageNavigator = createPageNavigator(async (page) => {
  const paginationList = await page.$('ul.pagination')
  const elements = await paginationList?.$$('li')
  return (elements ?? []).slice(-2)[0]
})

export const detailPageNavigator = createDetailPageNavigator(async (page) => {
  const elements = await page.$$('div.obituary-img-box')
  return elements
})
