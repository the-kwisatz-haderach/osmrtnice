import React, { ReactElement } from 'react'
import { Button, Flex, GridItem, SimpleGrid } from '@chakra-ui/react'
import { IObituary } from '../../lib/domain/types'
import { Obituary, ObituarySkeleton, ObituaryContainer } from '../Obituary'
import { EmptyState } from '../EmptyState'
import { useTranslation } from 'next-i18next'
import { ResultsDescription } from './ResultsDescription'
import { isMultiObituary } from 'lib/domain/isMultiObituary'
import { Contained } from 'components/Contained/Contained'

interface Props {
  obituaries: IObituary[]
  onLoadMore: () => void
  hasMore: boolean
  isLoading: boolean
  isLoadingNext: boolean
  hasQuery: boolean
}

export default function ObituaryGrid({
  obituaries,
  hasMore,
  onLoadMore,
  isLoading,
  isLoadingNext,
  hasQuery,
}: Props): ReactElement {
  const { t } = useTranslation()
  return (
    <Contained my={{ base: 0, lg: 8 }}>
      <ResultsDescription
        resultsCount={obituaries.length}
        hasMore={hasMore}
        hasQuery={hasQuery}
      />
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
                    isMultiObituary(obituary) || obituary.size === 'large'
                      ? 2
                      : 1,
                  ]}
                >
                  <ObituaryContainer {...obituary} Renderer={Obituary} />
                </GridItem>
              ))}
        </SimpleGrid>
      ) : (
        <EmptyState
          title={t('search-results-empty-title')}
          description={t('search-results-empty-description')}
          icon="no-results"
        />
      )}
      {hasMore && (
        <Flex justifyContent="center" mt={[4, 6, 8, 10]}>
          <Button
            isLoading={isLoadingNext}
            colorScheme="brand"
            disabled={!hasMore}
            onClick={onLoadMore}
            title={t('search-results-more')}
          >
            {t('search-results-more')}
          </Button>
        </Flex>
      )}
    </Contained>
  )
}
