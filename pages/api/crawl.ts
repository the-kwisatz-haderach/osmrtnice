import { NextApiResponse } from 'next'
import { siteProcessor as oslobodjenjeSiteProcessor } from '../../lib/crawler/crawlers/oslobodjenje'
import { siteProcessor as avazSiteProcessor } from '../../lib/crawler/crawlers/avaz'
import { siteProcessor as nekrosSiteProcessor } from '../../lib/crawler/crawlers/nekros'
import SiteCrawler from '../../lib/crawler/SiteCrawler'
import { IObituaryInput } from '../../lib/domain/types'
import attachMiddleware from '../../middleware'
import { EnhancedNextApiRequest } from '../../middleware/types'
import { createObituary } from '../../lib/domain/obituary'

const crawlers = [
  // new SiteCrawler<IObituaryInput[]>({
  //   url: 'https://www.osmrtnica.ba/',
  //   documentProcessor: osmrtnicaSiteProcessor,
  // }),
  new SiteCrawler<IObituaryInput[]>({
    url: 'https://www.oslobodjenje.ba/smrtovnice',
    documentProcessor: oslobodjenjeSiteProcessor,
  }),
  new SiteCrawler<IObituaryInput[]>({
    url: 'https://digital.avaz.ba/smrtovnice',
    documentProcessor: avazSiteProcessor,
  }),
  new SiteCrawler<IObituaryInput[]>({
    url: 'https://www.nekros.info/',
    documentProcessor: nekrosSiteProcessor,
  }),
]

export default attachMiddleware().get(
  async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
    try {
      if (process.env.CRAWLER === req.query.token) {
        const obituariesCollection = await req.db.collection('obituaries')
        await obituariesCollection.createIndex(
          { firstname: 1, middlename: 1, surname: 1 },
          { unique: true }
        )
        crawlers.forEach((crawler) => {
          crawler.setOutputHandler(async (obituaries) => {
            await Promise.all(
              obituaries.map((obituary) =>
                obituariesCollection.insertOne(createObituary(obituary))
              )
            )
          })
        })
        return Promise.all(crawlers.map((crawler) => crawler.init())).then(() =>
          res.status(200).send('Crawl finished.')
        )
      }
      return res.status(400).send('Incorrect token passed.')
    } catch (err) {
      return res.status(500).send(err.message)
    }
  }
)
