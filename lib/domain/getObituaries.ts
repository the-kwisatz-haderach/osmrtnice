import { kv } from '@vercel/kv'
import { DEFAULT_LIST_LIMIT } from 'lib/constants'
import { Db, ObjectID } from 'mongodb'
import { IObituary, IObituaryQuery, ObituaryType } from './types'

type IGetObituaries = (
  db: Db,
  {
    next = '',
    search = '',
    category = '',
    limit = DEFAULT_LIST_LIMIT,
  }: IObituaryQuery
) => Promise<{
  data: IObituary[]
  next: string
}>

const withCache = (fn: IGetObituaries): IGetObituaries => async (
  db,
  { next = '', search = '', category = '', limit = DEFAULT_LIST_LIMIT }
) => {
  if (process.env.DISABLE_CACHE === 'true') {
    return await fn(db, { next, search, category, limit })
  }
  const kvKey = [next, search, category, limit].join('&')
  const cached = await kv.get<ReturnType<IGetObituaries>>(kvKey)
  if (cached !== null) {
    return cached
  }

  const res = await fn(db, { next, search, category, limit })
  try {
    await kv.set(kvKey, JSON.stringify(res), {
      px: 60 * 5 * 1000,
    })
  } catch (err) {
    console.error(err)
  }
  return res
}

const getObituaries: IGetObituaries = async (
  db,
  { next = '', search = '', category = '', limit = DEFAULT_LIST_LIMIT }
) => {
  const $regex = new RegExp(search.split(/\s+/).join('|'), 'i')
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
    next: obituaries.length > limit ? data.at(-1)?._id : null,
  }
}

export default withCache(getObituaries)
