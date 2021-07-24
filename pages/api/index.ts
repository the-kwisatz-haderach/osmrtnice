import { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  console.log(req.method)
  switch (req.method) {
    case 'GET': {
      try {
        console.log(req.headers)
        console.log('running!')
        res.status(200).send('Crawl initiated')
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
