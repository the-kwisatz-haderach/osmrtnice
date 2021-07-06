import SiteCrawler from '../../SiteCrawler'
import { createOutputWriter } from '../common'
import { createSiteProcessor } from '../../helpers/createSiteProcessor'
import { nextPageNavigator } from './pageNavigator'
import pageProcessor from './pageProcessor'
import { IObituary } from '../../../domain/types'

const siteProcessor = createSiteProcessor(
  pageProcessor,
  nextPageNavigator,
  (result) => result.length >= 10
)

export default new SiteCrawler<IObituary[]>({
  url: process.env.NEKROS_URL,
  outputHandler: createOutputWriter('nekros'),
  documentProcessor: siteProcessor,
  // cronSchedule: process.env.CRON_SCHEDULE as string
})
