import { Divider, VStack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { IList } from '../../../lib/storyblok/types'
import { DynamicBlokComponent } from '../DynamicBlokComponent'

export default function ListBlok({ items }: IList): ReactElement {
  return (
    <VStack
      spacing={12}
      maxW="container.xl"
      mx="auto"
      my={12}
      px={4}
      sx={{
        '& > *': {
          width: '100%',
        },
      }}
      divider={<Divider />}
    >
      {items.map((blok) => (
        <DynamicBlokComponent key={blok._uid} blok={blok} />
      ))}
    </VStack>
  )
}
