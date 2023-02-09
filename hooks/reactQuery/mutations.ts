import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { IAppreciation, IObituaryFull } from '../../lib/domain/types'

export const useIncrementAppreciation = () => {
  const queryClient = useQueryClient()
  return useMutation<IAppreciation, unknown, { id: string; increment: number }>(
    'incrementAppreciation',
    async ({ id, increment }) => {
      const res = await axios.post<IAppreciation>('/api/appreciations', {
        id,
        increment,
      })
      return res.data
    },
    {
      onSuccess: (data, { id }) => {
        queryClient.invalidateQueries(['appreciations', id])
        queryClient.setQueryData(['appreciations', id], data)
        // queryClient.setQueriesData<IObituaryFull[]>('obituaries', (old) =>
        //   old.map((obit) =>
        //     obit._id === id
        //       ? {
        //           ...obit,
        //           appreciations: data.quantity,
        //         }
        //       : obit
        //   )
        // )
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