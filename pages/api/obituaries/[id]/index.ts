import { NextApiResponse } from 'next'
import { IObituary } from 'lib/domain/types'
import attachMiddleware, { EnhancedNextApiRequest } from 'middleware'
import { ObjectID } from 'mongodb'

export default attachMiddleware()
  .put(
    async (
      req: EnhancedNextApiRequest,
      res: NextApiResponse
    ): Promise<void> => {
      try {
        const id = req.query.id as string
        const obituaries = req.db.collection<IObituary>('obituaries')
        if (!req.body) {
          return res.status(400).end()
        }
        const obituary = await obituaries.findOneAndUpdate(
          { _id: id },
          req.body,
          { returnDocument: 'after' }
        )
        res.setHeader('Cache-Control', 's-maxage=3600, max-age=0')
        return res.status(200).json(obituary)
      } catch (err) {
        console.error(err)
        return res.status(500).end()
      }
    }
  )
  .get(
    async (
      req: EnhancedNextApiRequest,
      res: NextApiResponse
    ): Promise<void> => {
      try {
        const id = req.query.id as string
        const obituary = await req.db
          .collection<Omit<IObituary, '_id'>>('obituaries')
          .findOne({
            _id: ObjectID.isValid(id) ? ObjectID.createFromHexString(id) : id,
          })
        return res.status(200).json(obituary)
      } catch (err) {
        console.error(err)
        return res.status(500).end()
      }
    }
  )
