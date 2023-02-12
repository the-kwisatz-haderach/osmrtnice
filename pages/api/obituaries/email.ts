import { NextApiResponse } from 'next'
import { sendEmail } from '../../../lib/email'
import { EnhancedNextApiRequest } from '../../../middleware/types'

const formatEmailMessage = <T extends Record<string, string>>(
  data: T
): string => {
  return Object.entries(data).reduce(
    (acc, [key, value]) => acc + `${key}: ${value}\n`,
    ''
  )
}

export default async (
  req: EnhancedNextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'POST': {
      try {
        let text = formatEmailMessage(req.body)
        const messageId = await sendEmail({
          subject: `Message From preminuli.ba`,
          text,
        })
        res.status(204).json({ messageId })
      } catch (err) {
        console.error(err)
        res.status(400).end()
      }
      break
    }
    default: {
      res.status(404).end()
    }
  }
}
