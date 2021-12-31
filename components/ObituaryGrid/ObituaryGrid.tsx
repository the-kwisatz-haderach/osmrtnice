import React, { ReactElement } from 'react'
import { Container, GridItem, SimpleGrid } from '@chakra-ui/react'
import { IObituary } from '../../lib/domain/types'
import { Obituary } from '../Obituary'

interface Props {
  obituaries: IObituary[]
}

export default function ObituaryGrid({ obituaries }: Props): ReactElement {
  return (
    <Container maxW="container.xl" my={8}>
      <SimpleGrid spacing={4} columns={[1, 2, 3, 4]}>
        {obituaries.map((obituary) => (
          <GridItem
            key={obituary._id}
            colSpan={[
              1,
              obituary.size === 'large' ? 2 : 1,
              obituary.size === 'large' ? 2 : 1,
            ]}
          >
            <Obituary {...obituary} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Container>
  )
}
