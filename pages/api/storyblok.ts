import { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'POST': {
      try {
        console.log(req.body)
        console.log(req.headers)
        res.status(200).json({ text: 'Wrong endpoint...' })
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
