import SiteCrawler from '../../SiteCrawler'
import { createOutputWriter } from '../common'
import pageProcessor from './pageProcessor'
import { nextPageNavigator, detailPageNavigator } from './pageNavigator'
import { createSiteProcessor } from '../../helpers/createSiteProcessor'
import { Obituary } from '../../../domain/obituary/types'

const siteProcessor = createSiteProcessor(
  pageProcessor,
  nextPageNavigator,
  (_, page) => page >= 20,
  detailPageNavigator
)

export default new SiteCrawler<Obituary[]>({
  url: process.env.AVAZ_URL,
  outputHandler: createOutputWriter('avaz'),
  documentProcessor: siteProcessor,
  // cronSchedule: process.env.CRON_SCHEDULE as string
})
