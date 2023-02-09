import { Db, ObjectID } from 'mongodb'
import Storyblok from '../storyblok/client'
import { Story } from '../storyblok/types'
import {
  IAppreciation,
  IObituary,
  IObituaryFull,
  IObituaryQuery,
  ObituaryType,
} from './types'

export async function getObituaries(
  db: Db,
  {
    next = '',
    nextPage = '',
    search = '',
    category = '',
    limit = 50,
  }: IObituaryQuery
) {
  const storyBlokObituaries =
    nextPage || !next
      ? (
          await Storyblok.getStories({
            starts_with: 'obituary',
            version: 'draft',
            is_startpage: 0,
            page: nextPage || '1',
            per_page: limit,
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
  const limitDiff = limit - storiesCount

  const appreciations = await db
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

  const obituaries: IObituaryFull[] =
    limitDiff > 0
      ? JSON.parse(
          JSON.stringify(
            await db
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
                          name_misc: {
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
                      _id: {
                        $gt: ObjectID.isValid(next)
                          ? ObjectID.createFromHexString(next)
                          : next,
                      },
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

  return {
    data: [...formattedStories, ...obituaries.slice(0, limitDiff)],
    next: obituaries.length > limitDiff ? obituaries.slice(-2)[0]?._id : null,
    nextPage:
      storiesCount >= limit
        ? (Number.parseInt(nextPage || '1') + 1).toString()
        : null,
  }
}
