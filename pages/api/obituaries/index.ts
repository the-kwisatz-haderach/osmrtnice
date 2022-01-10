import { ObjectID } from 'mongodb'
import { NextApiResponse } from 'next'
import {
  IAppreciation,
  IObituary,
  ObituaryType,
} from '../../../lib/domain/types'
import Storyblok from '../../../lib/storyblok/client'
import { Story } from '../../../lib/storyblok/types'
import attachMiddleware from '../../../middleware'
import { EnhancedNextApiRequest } from '../../../middleware/types'

const MAX_LIMIT = 100
const DEFAULT_LIMIT = 100

export default attachMiddleware().get(
  async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
    try {
      const { next, search, limit, category, nextPage } = req.query as Record<
        string,
        string
      >
      const parsedLimit = Math.min(
        Number.parseInt(limit || DEFAULT_LIMIT.toString()),
        MAX_LIMIT
      )

      const storyBlokObituaries =
        nextPage || !next
          ? (
              await Storyblok.getStories({
                starts_with: 'obituary',
                version: 'draft',
                is_startpage: 0,
                page: nextPage || '1',
                per_page: parsedLimit,
                ...(search && { search_term: search }),
                ...(category && {
                  filter_query: {
                    type: {
                      in: category,
                    },
                  },
                }),
              })
            ).data.stories
          : []

      const storiesCount = storyBlokObituaries.length
      const limitDiff = parsedLimit - storiesCount

      const appreciations = await req.db
        .collection<IAppreciation>('appreciations')
        .find({ _id: { $in: storyBlokObituaries.map((data) => data.uuid) } })
        .toArray()

      const formattedStories = storyBlokObituaries.map<
        IObituary & { appreciations: number }
      >((story: Story<Omit<IObituary, '_id'>>) => ({
        ...story.content,
        date_created: story.first_published_at,
        date_updated: story.published_at,
        _id: story.uuid,
        is_crawled: false,
        appreciations:
          appreciations.find((appreciation) => appreciation._id === story.uuid)
            ?.quantity ?? 0,
      }))

      const $regex = new RegExp(search.split(/s+/).join('|'), 'i')

      const obituaries: IObituary[] =
        limitDiff > 0
          ? JSON.parse(
              JSON.stringify(
                await req.db
                  .collection<Omit<IObituary, '_id'>>('obituaries')
                  .aggregate([
                    {
                      $match: {
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
                      },
                    },
                    {
                      $lookup: {
                        from: 'appreciations',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'appreciations',
                      },
                    },
                    {
                      $unwind: {
                        path: '$appreciations',
                        preserveNullAndEmptyArrays: true,
                      },
                    },
                    {
                      $addFields: { appreciations: '$appreciations.quantity' },
                    },
                  ])
                  .limit(limitDiff + 1)
                  .toArray()
              )
            )
          : []

      res.status(200).json({
        data: [...formattedStories, ...obituaries.slice(0, limitDiff)],
        next:
          obituaries.length > limitDiff ? obituaries.slice(-2)[0]?._id : null,
        nextPage:
          storiesCount >= parsedLimit
            ? Number.parseInt(nextPage || '1') + 1
            : null,
      })
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  }
)
