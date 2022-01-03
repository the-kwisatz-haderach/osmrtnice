import React, { ReactElement } from 'react'
import {
  Button,
  Container,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { IObituary } from '../../lib/domain/types'
import { Obituary, ObituarySkeleton } from '../Obituary'
import { EmptyState } from '../EmptyState'

interface Props {
  obituaries: IObituary[]
  onLoadMore: () => void
  hasMore: boolean
  isLoading: boolean
  isLoadingNext: boolean
}

export default function ObituaryGrid({
  obituaries,
  hasMore,
  onLoadMore,
  isLoading,
  isLoadingNext,
}: Props): ReactElement {
  return (
    <Container maxW="container.xl" my={8}>
      <Text hidden={obituaries.length < 1} textAlign="center" my={5}>
        Found <b>{obituaries.length}</b> result
        {obituaries.length > 1 ? 's' : ''}.
      </Text>
      {isLoading || obituaries.length > 0 ? (
        <SimpleGrid spacing={4} columns={[1, 2, 3, 4]}>
          {isLoading
            ? Array(8)
                .fill(0)
                .map((_, i) => <ObituarySkeleton key={i} />)
            : obituaries.map((obituary) => (
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
      ) : (
        <EmptyState
          mt={24}
          title="No results found."
          description="Try changing your search query."
          icon="warn"
        />
      )}
      <Flex justifyContent="center" hidden={!hasMore} mt={10}>
        <Button
          isLoading={isLoadingNext}
          colorScheme="orange"
          disabled={!hasMore}
          onClick={onLoadMore}
        >
          Load more
        </Button>
      </Flex>
    </Container>
  )
}
