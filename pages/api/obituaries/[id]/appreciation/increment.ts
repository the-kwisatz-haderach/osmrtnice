import { ObjectID } from 'mongodb'
import { NextApiResponse } from 'next'
import { IObituary } from '../../../../../lib/domain/types'
import attachMiddleware from '../../../../../middleware'
import { EnhancedNextApiRequest } from '../../../../../middleware/types'

export default attachMiddleware().post(
  async (req: EnhancedNextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const id = req.query.id as string
      const { increment = 1 } = req.body
      const obituary = (
        await req.db
          .collection<Omit<IObituary, '_id'>>('obituaries')
          .findOneAndUpdate(
            { _id: new ObjectID(id) },
            { $inc: { appreciations: increment } },
            {
              returnDocument: 'after',
            }
          )
      ).value

      return res.status(200).json(obituary)
    } catch (err) {
      console.error(err)
      return res.status(500).end()
    }
  }
)
