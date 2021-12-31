import { NextApiResponse } from 'next'
import { IObituary } from '../../../../../lib/domain/types'
import attachMiddleware from '../../../../../middleware'
import { EnhancedNextApiRequest } from '../../../../../middleware/types'

export default attachMiddleware().post(
  async (req: EnhancedNextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const id = req.query.id as string
      const obituaries = req.db.collection<IObituary>('obituaries')
      switch (req.method) {
        case 'POST': {
          const { increment = 1 } = req.body
          const obituary = await obituaries.findOneAndUpdate(
            { _id: id },
            { $inc: { appreciations: increment } },
            {
              returnDocument: 'after',
            }
          )
          return res.status(200).json(obituary.value)
        }
        default:
          return res.status(400).end()
      }
    } catch (err) {
      console.error(err)
      return res.status(500).end()
    }
  }
)
