import { createOutputWriter } from '../common'
import { createSiteProcessor } from '../../helpers/createSiteProcessor'
import { nextPageNavigator } from './pageNavigator'
import pageProcessor from './pageProcessor'
import SiteCrawler from '../../SiteCrawler'
import { Obituary } from '../../../domain/obituary/types'

const siteProcessor = createSiteProcessor(
  pageProcessor,
  nextPageNavigator,
  (_, pageIndex) => pageIndex >= 10
)

export default new SiteCrawler<Obituary[]>({
  url: process.env.OSLOBODJENJE_URL,
  outputHandler: createOutputWriter('oslobodjenje'),
  documentProcessor: siteProcessor,
  // cronSchedule: process.env.CRON_SCHEDULE as string
})
