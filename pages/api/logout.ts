import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'GET': {
      try {
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('admin-session', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            expires: new Date(0),
          })
        )
        res.status(200).end()
        return
      } catch (err) {
        console.error(err)
        res.status(400).end()
        return
      }
    }
    default: {
      res.status(404).end()
      return
    }
  }
}
