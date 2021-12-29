import React, { ReactElement } from 'react'
import { Container, GridItem, SimpleGrid } from '@chakra-ui/react'
import { IObituary } from '../../lib/domain/types'
import { Obituary } from '../Obituary'
import { Story } from '../../lib/storyblok/types'

interface Props {
  obituaries: Array<Story<IObituary>>
}

export default function ObituaryGrid({ obituaries }: Props): ReactElement {
  return (
    <Container maxW="container.xl" my={8}>
      <SimpleGrid spacing={4} columns={[1, 2, 3, 4]}>
        {obituaries.map(({ content, uuid }) => (
          <GridItem
            key={uuid}
            colSpan={[
              1,
              content.size === 'large' ? 2 : 1,
              content.size === 'large' ? 2 : 1,
            ]}
          >
            <Obituary {...content} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Container>
  )
}
