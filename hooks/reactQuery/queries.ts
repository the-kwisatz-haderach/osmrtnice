import axios from 'axios'
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
} from 'react-query'
import { IAppreciation, IObituaryFull } from '../../lib/domain/types'

interface Input {
  category?: string
  query?: string
  limit?: number
}

export const useObituaries = (
  params: Input,
  options?: UseInfiniteQueryOptions<{
    data: IObituaryFull[]
    next?: string
    nextPage?: string
  }>
) =>
  useInfiniteQuery<{
    data: IObituaryFull[]
    next?: string
    nextPage?: string
  }>(
    ['obituaries', params],
    async ({ pageParam = '' }: { pageParam?: string }) => {
      const res = await axios.get(
        `/api/obituaries?search=${params.query || ''}&category=${
          params.category || ''
        }&limit=${params.limit || 60}&${pageParam}`
      )
      return res.data
    },
    {
      ...options,
      refetchOnMount: false,
      getNextPageParam: (lastPage) => {
        let nextString: string[] = []
        if (lastPage.next) {
          nextString.push(`next=${lastPage.next}`)
        }
        if (lastPage.nextPage) {
          nextString.push(`nextPage=${lastPage.nextPage}`)
        }
        return nextString.join('&') || undefined
      },
      keepPreviousData: true,
    }
  )

export const useAppreciations = (id: string) =>
  useQuery<Omit<IAppreciation, '_id'>>({
    queryKey: ['appreciations', id],
    placeholderData: { quantity: 0 },
    queryFn: async () => {
      const res = await axios.get(`/api/appreciations/${id}`)
      return res.data
    },
  })
