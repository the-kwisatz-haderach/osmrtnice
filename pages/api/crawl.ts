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

export default async (
  req: EnhancedNextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'GET': {
      try {
        console.log(req.query)
        // await req.db.collection('obituaries').find({}).forEach(console.log)
        // crawler.setOutputHandler(async (obituaries) => {
        //   await req.db.collection('obituaries').insertMany(obituaries)
        // })

        // await crawler.init()
        let response =
          process.env.CRAWLER === req.query.token ? 'CORRECT' : 'FALSE'

        res.status(200).send(response)
        break
      } catch (err) {
        console.error(err.message)
        res.status(400).end()
        break
      }
    }
    default: {
      res.status(404).end()
      break
    }
  }
}
