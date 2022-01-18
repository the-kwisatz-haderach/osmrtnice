import { NextApiRequest } from 'next'
import { IObituaryQuery } from './types'

const MAX_LIMIT = 100
const DEFAULT_LIMIT = 100

export const parseObituaryQuery = (
  queryString: NextApiRequest['query']
): IObituaryQuery => {
  const { limit, ...query } = queryString as Record<string, string>
  const parsedLimit = Math.min(
    Number.parseInt(limit || DEFAULT_LIMIT.toString()),
    MAX_LIMIT
  )
  return {
    category: query.category || '',
    search: query.search || '',
    next: query.next || '',
    nextPage: query.nextPage || '',
    limit: parsedLimit,
  }
}
