import { Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

interface Props {
  hasMore: boolean
  resultsCount: number
  hasQuery?: boolean
}

export const ResultsDescription = ({
  resultsCount,
  hasMore,
  hasQuery,
}: Props) => {
  const { t } = useTranslation()
  return (
    <Text hidden={!hasQuery || resultsCount < 1} textAlign="center" my={5}>
      {t('search-results-found')}
      {hasMore ? ' ' + t('search-results-over') : ' '} <b>{resultsCount}</b>{' '}
      {t('search-results-result')}.
    </Text>
  )
}
