import { DEFAULT_LIST_LIMIT, MAX_LIST_LIMIT } from 'lib/constants'
import { NextApiRequest } from 'next'
import { IObituaryQuery } from './types'

export const parseObituaryQuery = (
  queryString: NextApiRequest['query']
): IObituaryQuery => {
  const { limit, ...query } = queryString as Record<string, string>
  const parsedLimit = Math.min(
    Number.parseInt(limit || DEFAULT_LIST_LIMIT.toString()),
    MAX_LIST_LIMIT
  )
  return {
    category: query.category || '',
    search: query.search || '',
    next: query.next || '',
    limit: parsedLimit,
  }
}
