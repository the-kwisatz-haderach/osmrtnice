import axios from 'axios'
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { IObituary } from 'lib/domain/types'

export const useIncrementAppreciation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    { appreciations: number },
    unknown,
    { id: string; increment: number }
  >(
    ['incrementAppreciation'],
    async ({ id, increment }) => {
      const res = await axios.post<{ appreciations: number }>(
        '/api/appreciations',
        {
          id,
          increment,
        }
      )
      return res.data
    },
    {
      onSuccess: (data, { id }) => {
        queryClient.invalidateQueries(['obituaries', id])
        queryClient.invalidateQueries(['obituariesInfinite'], {
          type: 'inactive',
        })
        queryClient.setQueriesData<
          InfiniteData<{
            data: IObituary[]
            next?: string
          }>
        >(
          {
            queryKey: ['obituariesInfinite'],
            predicate: (q) => q.isActive(),
          },
          (old) => ({
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((obit) =>
                obit._id === id
                  ? {
                      ...obit,
                      appreciations: data.appreciations,
                    }
                  : obit
              ),
            })),
          })
        )
        const isClicked = Boolean(
          typeof window !== 'undefined' && window.localStorage.getItem(id)
        )
        if (isClicked) {
          window.localStorage.removeItem(id)
        } else {
          window.localStorage.setItem(id, 'true')
        }
      },
    }
  )
}
