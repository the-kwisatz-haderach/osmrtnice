import { HStack, Text } from '@chakra-ui/react'
import { ObituaryType } from 'lib/domain/types'
import React from 'react'
import { formatDate } from 'utils/formatDate'

type Props = {
  from?: string
  to?: string
  type: ObituaryType
  size?: 'default' | 'large'
}

export default function Timestamp({ from, to, type, size = 'default' }: Props) {
  return (
    <HStack
      hidden={!from && !to}
      spacing={1}
      justify={size === 'large' ? 'unset' : 'center'}
      fontSize={size === 'large' ? 'lg' : 'unset'}
      fontWeight="bold"
    >
      <Text fontSize={size === 'large' ? 'unset' : 'sm'} hidden={!from}>
        {formatDate(from, {
          year: 'numeric',
          ...(type === 'in-memoriam' && {
            month: 'numeric',
            day: 'numeric',
          }),
        })}
      </Text>
      <Text hidden={!from || !to} fontSize={size === 'large' ? 'unset' : 'sm'}>
        -
      </Text>
      <Text fontSize={size === 'large' ? 'unset' : 'sm'} hidden={!to}>
        {formatDate(to, {
          year: 'numeric',
          ...(type === 'in-memoriam' && {
            month: 'numeric',
            day: 'numeric',
          }),
        })}
      </Text>
    </HStack>
  )
}
