import React, { ReactElement } from 'react'
import { Button, Container, Flex, GridItem, SimpleGrid } from '@chakra-ui/react'
import { IObituary } from '../../lib/domain/types'
import { Obituary, ObituarySkeleton } from '../Obituary'
import { EmptyState } from '../EmptyState'
import { useTranslation } from 'next-i18next'
import { ResultsDescription } from './ResultsDescription'

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
  const { t } = useTranslation()
  return (
    <Container maxW="container.xl" my={8}>
      <ResultsDescription resultsCount={obituaries.length} hasMore={hasMore} />
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
          title={t('search-results-empty-title')}
          description={t('search-results-empty-description')}
          icon="no-results"
        />
      )}
      {hasMore && (
        <Flex justifyContent="center" mt={10}>
          <Button
            isLoading={isLoadingNext}
            colorScheme="orange"
            disabled={!hasMore}
            onClick={onLoadMore}
            title={t('search-results-more')}
          >
            {t('search-results-more')}
          </Button>
        </Flex>
      )}
    </Container>
  )
}
