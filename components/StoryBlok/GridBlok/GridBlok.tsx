import React, { ReactElement } from 'react'
import { Container, SimpleGrid } from '@chakra-ui/react'
import { BlokType, IGrid } from '../../../lib/storyblok/types'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'

export default function GridBlok({
  blok,
}: {
  blok: BlokType<IGrid>
}): ReactElement {
  const { columns, grid_gap = 10, col_count = 1 } = blok
  return (
    <Container {...storyblokEditable(blok)} maxW="container.xl" my={10}>
      <SimpleGrid columns={col_count} gap={grid_gap}>
        {columns.map((col) => (
          <StoryblokComponent key={col._uid} blok={col} />
        ))}
      </SimpleGrid>
    </Container>
  )
}
