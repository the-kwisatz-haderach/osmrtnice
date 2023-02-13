import { NextApiResponse } from 'next'
import { ObjectID } from 'mongodb'
import attachMiddleware from '../../../middleware'
import { EnhancedNextApiRequest } from '../../../middleware/types'
import { IObituary } from 'lib/domain/types'

export default attachMiddleware().post(
  async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.body.id as string
      if ('increment' in req.body && typeof req.body.increment === 'number') {
        const result = await req.db
          .collection<Omit<IObituary, '_id'>>('obituaries')
          .findOneAndUpdate(
            {
              _id: ObjectID.isValid(id) ? ObjectID.createFromHexString(id) : id,
            },
            {
              $inc: {
                appreciations: Number.parseInt(req.body.increment),
              },
            },
            {
              returnDocument: 'after',
            }
          )
        return res
          .status(200)
          .json({ appreciations: result.value.appreciations })
      }
      return res.status(400).end()
    } catch (error) {
      return res.status(500).json(error)
    }
  }
)
