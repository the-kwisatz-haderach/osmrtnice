import { ObjectID } from 'mongodb'
import { NextApiResponse } from 'next'
import { IAppreciation } from '../../../lib/domain/types'
import attachMiddleware from '../../../middleware'
import { EnhancedNextApiRequest } from '../../../middleware/types'

export default attachMiddleware().get(
  async (req: EnhancedNextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const id = req.query.id as string
      const data = await req.db
        .collection<Omit<IAppreciation, '_id'>>('appreciations')
        .findOne({
          _id: ObjectID.isValid(id) ? ObjectID.createFromHexString(id) : id,
        })
      return res.status(200).json(data || { quantity: 0 })
    } catch (err) {
      console.error(err)
      return res.status(500).end()
    }
  }
)
