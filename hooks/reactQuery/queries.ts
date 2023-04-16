import axios from 'axios'
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import { IObituary } from '../../lib/domain/types'

interface Input {
  category?: string
  query?: string
  limit?: number
}

export const useObituary = (id: string, options?: UseQueryOptions<IObituary>) =>
  useQuery<IObituary>({
    ...options,
    queryKey: ['obituaries', id],
    queryFn: async () => {
      const res = await axios.get<IObituary>('/api/obituaries/' + id)
      return res.data
    },
  })

export const useObituaries = (
  params: Input,
  options?: UseInfiniteQueryOptions<{
    data: IObituary[]
    next?: string
  }>
) =>
  useInfiniteQuery<{
    data: IObituary[]
    next?: string
  }>(
    ['obituariesInfinite', params],
    async ({ pageParam = '' }: { pageParam?: string }) => {
      const query = new URLSearchParams()
      if (params.query) {
        query.append('search', params.query)
      }
      if (params.category) {
        query.append('category', params.category)
      }
      if (pageParam) {
        query.append('next', pageParam)
      }
      if (params.limit) {
        query.append('limit', params.limit.toString())
      }
      const res = await axios.get('/api/obituaries?' + query.toString())
      return res.data
    },
    {
      ...options,
      getNextPageParam: (lastPage) => lastPage?.next,
      keepPreviousData: true,
      placeholderData: {
        pages: [],
        pageParams: [undefined],
      },
    }
  )
