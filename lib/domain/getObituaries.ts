import { DEFAULT_LIST_LIMIT } from 'lib/constants'
import { Db, ObjectID } from 'mongodb'
import { IObituary, IObituaryQuery, ObituaryType } from './types'

export async function getObituaries(
  db: Db,
  {
    next = '',
    search = '',
    category = '',
    limit = DEFAULT_LIST_LIMIT,
  }: IObituaryQuery
) {
  const $regex = new RegExp(search.split(/s+/).join('|'), 'i')

  const obituaries: IObituary[] = JSON.parse(
    JSON.stringify(
      await db
        .collection<Omit<IObituary, '_id'>>('obituaries')
        .find(
          {
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
                $lt: ObjectID.isValid(next)
                  ? ObjectID.createFromHexString(next)
                  : next,
              },
            }),
          },
          {
            limit: limit + 1,
            sort: { _id: -1 },
          }
        )
        .toArray()
    )
  )

  const data = obituaries.slice(0, limit)

  return {
    data,
    next: obituaries.length > limit ? data[data.length - 1]?._id : null,
  }
}
