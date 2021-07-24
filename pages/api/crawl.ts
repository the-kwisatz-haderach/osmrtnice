import { NextApiResponse } from 'next'
import { siteProcessor } from '../../lib/crawler/crawlers/oslobodjenje'
import SiteCrawler from '../../lib/crawler/SiteCrawler'
import { IObituaryInput } from '../../lib/domain/types'
import attachMiddleware from '../../middleware'
import { EnhancedNextApiRequest } from '../../middleware/types'

const crawler = new SiteCrawler<IObituaryInput[]>({
  url: process.env.OSLOBODJENJE_URL,
  documentProcessor: siteProcessor,
  // cronSchedule: process.env.CRON_SCHEDULE as string
})

export default attachMiddleware().get(
  async (req: EnhancedNextApiRequest, res: NextApiResponse): Promise<void> => {
    switch (req.method) {
      case 'GET': {
        try {
          // await req.db.collection('obituaries').find({}).forEach(console.log)
          // crawler.setOutputHandler(async (obituaries) => {
          //   await req.db.collection('obituaries').insertMany(obituaries)
          // })

          // await crawler.init()
          console.log(req.headers)
          console.log('running!')
          res.status(200).send('Crawl initiated')
          break
        } catch (err) {
          console.error(err.message)
          res.status(400)
          break
        }
      }
      default: {
        res.status(404)
      }
    }
  }
)
