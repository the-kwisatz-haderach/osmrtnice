import { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'GET': {
      try {
        res.status(200).send('Wrong endpoint...')
        break
      } catch (err) {
        console.error(err)
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
