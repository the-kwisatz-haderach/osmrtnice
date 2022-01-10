import { ObjectID } from 'mongodb'
import { NextApiResponse } from 'next'
import { IObituary, ObituaryType } from '../../../lib/domain/types'
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

      const formattedStories = storyBlokObituaries.map<IObituary>(
        (story: Story<Omit<IObituary, '_id'>>) => ({
          ...story.content,
          date_created: story.first_published_at,
          date_updated: story.published_at,
          _id: story.uuid,
          is_crawled: false,
        })
      )

      const obituaries: IObituary[] =
        limitDiff > 0
          ? JSON.parse(
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
                            $regex: new RegExp(
                              search.split(/s+/).join('|'),
                              'i'
                            ),
                          },
                        },
                        {
                          middlename: {
                            $regex: new RegExp(
                              search.split(/s+/).join('|'),
                              'i'
                            ),
                          },
                        },
                        {
                          surname: {
                            $regex: new RegExp(
                              search.split(/s+/).join('|'),
                              'i'
                            ),
                          },
                        },
                      ],
                    }),
                    ...(next && {
                      _id: { $gt: new ObjectID(next) },
                    }),
                  })
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
