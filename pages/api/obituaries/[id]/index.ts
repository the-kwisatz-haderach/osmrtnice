import { NextApiResponse } from 'next'
import { IObituary } from '../../../../lib/domain/types'
import attachMiddleware from '../../../../middleware'
import { EnhancedNextApiRequest } from '../../../../middleware/types'

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
        const obituaries = req.db.collection<IObituary>('obituaries')
        const obituary = await obituaries.findOne({ _id: id })
        return res.status(200).json(obituary)
      } catch (err) {
        console.error(err)
        return res.status(500).end()
      }
    }
  )
