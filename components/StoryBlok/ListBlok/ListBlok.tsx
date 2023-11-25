import { Divider, VStack } from '@chakra-ui/react'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import React, { ReactElement } from 'react'
import { BlokType, IList } from '../../../lib/storyblok/types'

export default function ListBlok({
  blok,
}: {
  blok: BlokType<IList>
}): ReactElement {
  const { items } = blok
  return (
    <VStack
      {...storyblokEditable(blok)}
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
      {items.map((nestedBlok) => (
        <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
      ))}
    </VStack>
  )
}
