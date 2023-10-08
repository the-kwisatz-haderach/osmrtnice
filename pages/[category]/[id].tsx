import { Box, Container } from '@chakra-ui/react'
import { ObituaryContainer } from 'components/Obituary'
import { REVALIDATE_TIME_SECONDS } from 'lib/constants'
import { ObjectID } from 'mongodb'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { ObituaryLarge } from '../../components/Obituary/components/ObituaryLarge'
import { connectToDb } from '../../db'
import { createMetaTitle, obituaryTypes } from '../../lib/domain'
import { IObituary } from '../../lib/domain/types'

const capitalize = (str = '') => str[0].toLocaleUpperCase() + str.slice(1)

export default function Obituary(props: IObituary): ReactElement {
  const { isFallback } = useRouter()
  const { t } = useTranslation()
  if (!props || isFallback) {
    return <></>
  }
  const {
    firstname,
    name_misc,
    surname,
    preamble,
    image,
    long_text,
    type,
  } = props
  const fullname = [firstname, surname, name_misc].join(' ')

  return (
    <div>
      <Head>
        <title>{createMetaTitle(capitalize(t(type)), fullname)}</title>
        {preamble && <meta name="description" content={preamble} />}
        {image && (
          <meta
            property="og:image"
            content={typeof image === 'string' ? image : image.filename}
          />
        )}
        {typeof long_text === 'string' && (
          <meta property="og:description" content={long_text} />
        )}
        <meta
          property="og:title"
          content={createMetaTitle(capitalize(t(type)), fullname)}
        />
      </Head>
      <Box minHeight="50vh" my={[10, 20]}>
        <Container
          maxW="container.lg"
          boxShadow={{ lg: 'xl' }}
          borderColor="gray.200"
          borderWidth={{ lg: 1 }}
          borderStyle="solid"
          borderRadius={5}
          px={[4, 6, 10]}
          py={[6, 8, 14]}
        >
          <ObituaryContainer {...props} Renderer={ObituaryLarge} />
        </Container>
      </Box>
    </div>
  )
}

export const getStaticProps: GetStaticProps<
  IObituary,
  { id: string; category: string }
> = async ({ params, locale }) => {
  try {
    const { db } = await connectToDb()
    const obituary: IObituary = JSON.parse(
      JSON.stringify(
        await db.collection<Omit<IObituary, '_id'>>('obituaries').findOne({
          _id: ObjectID.isValid(params.id)
            ? ObjectID.createFromHexString(params.id)
            : new ObjectID(params.id),
        })
      )
    )
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        ...obituary,
      },
      revalidate: REVALIDATE_TIME_SECONDS,
    }
  } catch (err) {
    console.error(err)
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { db } = await connectToDb()
  const paths = await Promise.all(
    obituaryTypes.flatMap(async (type) =>
      JSON.parse(
        JSON.stringify(
          await db
            .collection<IObituary>('obituaries')
            .find({
              type,
            })
            .limit(50)
            .toArray()
        )
      ).flatMap((entry: IObituary) => ({
        params: { id: entry._id, category: type },
      }))
    )
  )
  return {
    paths: paths.flat(),
    fallback: 'blocking',
  }
}
