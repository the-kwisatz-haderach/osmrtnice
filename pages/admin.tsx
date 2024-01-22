import cookie from 'cookie'
import { ReactElement, useState } from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ObituaryGrid } from 'components/ObituaryGrid'
import { AdminProvider } from 'contexts/AdminContext'
import { useObituaries } from 'hooks/reactQuery/queries'
import { ProgressBar } from 'components/ProgessBar'
import { Contained } from 'components/Contained/Contained'
import { SearchInput } from 'components/SearchInput'

interface Props {}

export default function Admin(): ReactElement {
  const { t } = useTranslation()
  const { query: routerQuery } = useRouter()
  const [query, setQuery] = useState((routerQuery?.search as string) ?? '')
  const {
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
    data,
  } = useObituaries({ query })

  return (
    <AdminProvider isAdmin>
      <Flex backgroundColor="gray.300">
        <Contained
          display="flex"
          justifyContent="center"
          height={32}
          py={[2, 4, 6]}
          alignItems="center"
        >
          <SearchInput
            title={t('search')}
            value={query}
            onChange={setQuery}
            placeholder={t('search-placeholder')}
          />
        </Contained>
      </Flex>
      <ProgressBar show={isFetching} />
      <ObituaryGrid
        isLoading={isLoading}
        isLoadingNext={isFetchingNextPage}
        obituaries={data.pages.flatMap((page) => page.data)}
        hasMore={hasNextPage}
        onLoadMore={fetchNextPage}
      />
    </AdminProvider>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
  query,
  req,
  res,
}) => {
  if (
    req.cookies?.['admin-session'] === 'true' ||
    query?.secret === process.env.ADMIN_SECRET
  ) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('admin-session', 'true', {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 1000 * 15 * 60),
        path: '/',
        sameSite: 'strict',
      })
    )
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
      },
    }
  }
  return {
    notFound: true,
  }
}
