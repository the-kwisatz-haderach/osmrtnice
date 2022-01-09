import { ObjectID } from 'mongodb'
import { NextApiResponse } from 'next'
import { IObituary, ObituaryType } from '../../../lib/domain/types'
import attachMiddleware from '../../../middleware'
import { EnhancedNextApiRequest } from '../../../middleware/types'

const MAX_LIMIT = 100
const DEFAULT_LIMIT = 100

export default attachMiddleware().get(
  async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
    try {
      const { next, search = '', limit, category } = req.query as Record<
        string,
        string
      >
      const parsedLimit = Math.min(
        Number.parseInt(limit || DEFAULT_LIMIT.toString()),
        MAX_LIMIT
      )

      const $regex = new RegExp(search.split(/s+/).join('|'), 'i')
      const obituaries: IObituary[] = JSON.parse(
        JSON.stringify(
          await req.db
            .collection<Omit<IObituary, '_id'>>('obituaries')
            .find({
              ...(category && {
                $and: [
                  {
                    type: category as ObituaryType,
                  },
                ],
              }),
              ...(search && {
                $or: [
                  {
                    firstname: {
                      $regex,
                    },
                  },
                  {
                    middlename: {
                      $regex,
                    },
                  },
                  {
                    surname: {
                      $regex,
                    },
                  },
                ],
              }),
              ...(next && {
                _id: { $gt: new ObjectID(next) },
              }),
            })
            .limit(parsedLimit + 1)
            .toArray()
        )
      )

      res.status(200).json({
        data: obituaries.slice(0, parsedLimit),
        next:
          obituaries.length > parsedLimit ? obituaries.slice(-2)[0]?._id : null,
      })
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  }
)
