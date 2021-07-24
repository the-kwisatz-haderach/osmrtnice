import { NextApiResponse } from 'next'
import { siteProcessor } from '../../lib/crawler/crawlers/oslobodjenje'
import SiteCrawler from '../../lib/crawler/SiteCrawler'
import { IObituaryInput } from '../../lib/domain/types'
import attachMiddleware from '../../middleware'
import { EnhancedNextApiRequest } from '../../middleware/types'

const crawler = new SiteCrawler<IObituaryInput[]>({
  url: 'https://www.oslobodjenje.ba/smrtovnice',
  documentProcessor: siteProcessor,
})

export default attachMiddleware().get(
  async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case 'GET': {
        try {
          if (process.env.CRAWLER === req.query.token) {
            await req.db.collection('obituaries').find({}).forEach(console.log)
            crawler.setOutputHandler(async (obituaries) => {
              await req.db.collection('obituaries').insertMany(obituaries)
            })
            await crawler.init()
            res.status(200).send('Crawl finished.')
            break
          }
          res.status(400).send('Incorrect token passed.')
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
)
