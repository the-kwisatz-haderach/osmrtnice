import axios from 'axios'
import { useInfiniteQuery } from 'react-query'
import { IObituary } from '../../lib/domain/types'

export const useObituaries = (params: { category?: string; query?: string }) =>
  useInfiniteQuery<{
    data: IObituary[]
    next?: string
    nextPage?: string
  }>(
    ['obituaries', params],
    async ({ pageParam }: { pageParam?: string }) => {
      const res = await axios.get(
        `/api/obituaries?search=${params.query || ''}&category=${
          params.category || ''
        }&limit=100&next=${pageParam ?? ''}`
      )
      return res.data
    },
    {
      placeholderData: { pages: [], pageParams: [] },
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
