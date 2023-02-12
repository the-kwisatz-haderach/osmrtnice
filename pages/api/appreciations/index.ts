import { NextApiResponse } from 'next'
import attachMiddleware from '../../../middleware'
import { EnhancedNextApiRequest } from '../../../middleware/types'
import { IAppreciation } from '../../../lib/domain/types'
import { ObjectID } from 'mongodb'

export default attachMiddleware().post(
  async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.body.id as string
      const appreciation = (
        await req.db
          .collection<Omit<IAppreciation, '_id'>>('appreciations')
          .findOneAndUpdate(
            {
              _id: ObjectID.isValid(id) ? ObjectID.createFromHexString(id) : id,
            },
            {
              $inc: {
                quantity: Number.parseInt(req.body.increment),
              },
            },
            {
              upsert: true,
              returnDocument: 'after',
            }
          )
      ).value
      return res.status(200).json(appreciation)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
)
