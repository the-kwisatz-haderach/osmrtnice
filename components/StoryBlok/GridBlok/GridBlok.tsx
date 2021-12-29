import React, { ReactElement } from 'react'
import { Container, SimpleGrid } from '@chakra-ui/react'
import { DynamicBlokComponent } from '../DynamicBlokComponent'
import { IGrid } from '../../../lib/storyblok/types'

export default function GridBlok({
  columns,
  grid_gap = 10,
  col_count = 1,
}: IGrid): ReactElement {
  return (
    <Container maxW="container.xl" my={10}>
      <SimpleGrid columns={col_count} gap={grid_gap}>
        {columns.map((col) => (
          <DynamicBlokComponent key={col._uid} blok={col} />
        ))}
      </SimpleGrid>
    </Container>
  )
}
