import axios from 'axios'
import { useMutation } from 'react-query'
import { IAppreciation } from '../../lib/domain/types'

export const useIncrementAppreciation = () =>
  useMutation<IAppreciation, unknown, { id: string; increment: number }>(
    'incrementAppreciation',
    async ({ id, increment }) => {
      const res = await axios.post<IAppreciation>('/api/appreciations', {
        id,
        increment,
      })
      return res.data
    }
  )
