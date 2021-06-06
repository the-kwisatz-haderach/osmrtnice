import { NextApiResponse } from 'next'
import { sendEmail } from '../../../lib/email'
import { EnhancedNextApiRequest } from '../../../middleware/types'

export default async (
  req: EnhancedNextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'POST': {
      try {
        const messageId = await sendEmail({
          subject: `Message From Osmrtnice`,
          text: req.body.message,
        })
        res.status(204).json({ messageId })
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
