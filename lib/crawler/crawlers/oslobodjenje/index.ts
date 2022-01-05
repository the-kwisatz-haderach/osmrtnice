import { createSiteProcessor } from '../../helpers/createSiteProcessor'
import { nextPageNavigator } from './pageNavigator'
import pageProcessor from './pageProcessor'

export const siteProcessor = createSiteProcessor(
  pageProcessor,
  nextPageNavigator,
  (_, page) => page > 1
)
