import { Container, Flex, Heading, Text } from '@chakra-ui/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Custom404() {
  const { t } = useTranslation()
  return (
    <Container maxW="container.xl">
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        py={10}
        minH={300}
        textAlign="center"
      >
        <Heading size="2xl" mb={6}>
          {t('404-header')}
        </Heading>
        <Text>{t('404-body')}</Text>
      </Flex>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient()
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      dehydratedState: dehydrate(queryClient),
    },
  }
}
