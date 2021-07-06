import SiteCrawler from '../../SiteCrawler'
import { createOutputWriter } from '../common'
import { createSiteProcessor } from '../../helpers/createSiteProcessor'
import { nextPageNavigator } from './pageNavigator'
import pageProcessor from './pageProcessor'
import { Obituary } from '../../../domain/obituary/types'

const siteProcessor = createSiteProcessor(
  pageProcessor,
  nextPageNavigator,
  (result) => result.length >= 10
)

export default new SiteCrawler<Obituary[]>({
  url: process.env.NEKROS_URL,
  outputHandler: createOutputWriter('nekros'),
  documentProcessor: siteProcessor,
  // cronSchedule: process.env.CRON_SCHEDULE as string
})
