import { NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import attachMiddleware from '../../../middleware'
import { EnhancedNextApiRequest } from '../../../middleware/types'
import { IObituary } from 'lib/domain/types'

const router = attachMiddleware()

router.post(async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.body.id as string
    if ('increment' in req.body && typeof req.body.increment === 'number') {
      const result = await req.db
        .collection<Omit<IObituary, '_id'>>('obituaries')
        .findOneAndUpdate(
          {
            _id: ObjectId.isValid(id)
              ? ObjectId.createFromHexString(id)
              : new ObjectId(id),
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

      return res.status(200).json({ appreciations: result.appreciations })
    }
    return res.status(400).end()
  } catch (error) {
    return res.status(500).json(error)
  }
})

export default router.handler({
  onError: (err, req, res) => {
    let message = 'unknown error'
    if (err instanceof Error) {
      console.error(err.stack)
      message = err.message
    }
    res.status(500).end(message)
  },
})
