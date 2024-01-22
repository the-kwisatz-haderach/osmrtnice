import { NextApiResponse } from 'next'
import { IObituary } from 'lib/domain/types'
import attachMiddleware, { EnhancedNextApiRequest } from 'middleware'
import { ObjectId } from 'mongodb'

const router = attachMiddleware()

type UpdateProperties = 'disabled'

const updateProperties: Extract<keyof IObituary, UpdateProperties>[] = [
  'disabled',
]

router
  .put(
    async (
      req: EnhancedNextApiRequest,
      res: NextApiResponse
    ): Promise<void> => {
      try {
        const id = req.query.id as string
        const obituaries = req.db.collection<Omit<IObituary, '_id'>>(
          'obituaries'
        )
        if (!req.body) {
          res.status(400).end()
          return
        }

        if (
          !(
            typeof req.body === 'object' &&
            req.body !== null &&
            Object.keys(req.body).every((key) =>
              updateProperties.includes(key as UpdateProperties)
            )
          )
        ) {
          res.status(40).end()
          return
        }

        const obituary = await obituaries.findOneAndUpdate(
          {
            _id: ObjectId.isValid(id)
              ? ObjectId.createFromHexString(id)
              : new ObjectId(id),
          },
          { $set: req.body },
          { returnDocument: 'after' }
        )
        return res.status(200).json(obituary)
      } catch (err) {
        console.error(err)
        res.status(500).end()
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
            _id: ObjectId.isValid(id)
              ? ObjectId.createFromHexString(id)
              : new ObjectId(id),
          })
        return res.status(200).json(obituary)
      } catch (err) {
        console.error(err)
        res.status(500).end()
      }
    }
  )

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
