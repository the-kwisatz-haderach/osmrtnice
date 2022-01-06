import { ObjectID } from 'mongodb'
import { NextApiResponse } from 'next'
import { IObituary, ObituaryType } from '../../../lib/domain/types'
import attachMiddleware from '../../../middleware'
import { EnhancedNextApiRequest } from '../../../middleware/types'

const MAX_LIMIT = 500
const DEFAULT_LIMIT = 100

/*

Get all from storyblok.
- If they are less than the limit, get from

*/

export default attachMiddleware().get(
  async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
    try {
      const { next, search, limit, category } = req.query as Record<
        string,
        string
      >
      const parsedLimit = Math.min(
        Number.parseInt(limit || DEFAULT_LIMIT.toString()),
        MAX_LIMIT
      )

      // const storyBlokObituaries = await Storyblok.getStories({
      //   starts_with: 'obituary',
      //   is_startpage: 0,
      //   per_page: parsedLimit,
      //   ...(search && { search_term: search }),
      //   ...(category && { filter_query: `category=${category}` }),
      // })

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
                  { firstname: { $regex: search, $options: 'i' } },
                  { middlename: { $regex: search, $options: 'i' } },
                  { surname: { $regex: search, $options: 'i' } },
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
