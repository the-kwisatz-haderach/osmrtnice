import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { IObituary } from 'lib/domain/types'

export const useUpdateObituary = () => {
  const queryClient = useQueryClient()
  return useMutation<
    IObituary | null,
    unknown,
    Pick<IObituary, '_id' | 'disabled'>
  >(
    ['disableObituary'],
    async ({ _id, disabled }) => {
      const res = await fetch('/api/obituaries/' + _id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          disabled,
        }),
      })
      if (res.ok) {
        return res.json()
      }
      return null
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['obituariesInfinite'])
      },
    }
  )
}

export const useIncrementAppreciation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    { appreciations: number },
    unknown,
    { id: string; increment: number }
  >(
    ['incrementAppreciation'],
    async ({ id, increment }) => {
      const res = await fetch('/api/appreciations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          increment,
        }),
      })
      if (res.ok) {
        return res.json()
      }
      return { appreciations: 0 }
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
