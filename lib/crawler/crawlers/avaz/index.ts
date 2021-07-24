import pageProcessor from './pageProcessor'
import { nextPageNavigator, detailPageNavigator } from './pageNavigator'
import { createSiteProcessor } from '../../helpers/createSiteProcessor'

export const siteProcessor = createSiteProcessor(
  pageProcessor,
  nextPageNavigator,
  (_, page) => page >= 10,
  detailPageNavigator
)
