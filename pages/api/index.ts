import { NextApiRequest, NextApiResponse } from 'next'
import crawler from '../../lib/crawler/crawlers/oslobodjenje'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'GET': {
      try {
        await crawler.init()
        res.status(200).send('Crawl initiated')
      } catch (err) {
        console.error(err.message)
        res.status(400)
      }
      break
    }
    default: {
      res.status(404)
    }
  }
}
