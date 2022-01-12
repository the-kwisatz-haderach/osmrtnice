import { Box, Container } from '@chakra-ui/react'
import { capitalize } from 'lodash'
import { ObjectID } from 'mongodb'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { ObituaryLarge } from '../../components/Obituary/ObituaryLarge'
import { connectToDb } from '../../db'
import { createMetaTitle, obituaryTypes } from '../../lib/domain'
import { IAppreciation, IObituary } from '../../lib/domain/types'
import Storyblok from '../../lib/storyblok/client'
import { Story } from '../../lib/storyblok/types'

interface Props extends IObituary {
  appreciations: number
}

export default function Obituary(props: Props): ReactElement {
  const {
    firstname,
    middlename,
    surname,
    preamble,
    image,
    long_text,
    type,
  } = props
  const fullname = [firstname, middlename, surname].join(' ')
  const { isFallback } = useRouter()
  const { t } = useTranslation()

  if (isFallback) {
    return <></>
  }

  return (
    <div>
      <Head>
        <title>{createMetaTitle(capitalize(t(type)), fullname)}</title>
        {preamble && <meta name="description" content={preamble} />}
        {image && <meta property="og:image" content={image} />}
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
          <ObituaryLarge {...props} />
        </Container>
      </Box>
    </div>
  )
}

export const getStaticProps: GetStaticProps<
  IObituary,
  { id: string; category: string }
> = async ({ params, locale }) => {
  const id = params.id
  const db = await (await connectToDb()).db
  let obituary: IObituary
  if (!ObjectID.isValid(params.id)) {
    const story = await Storyblok.getStory(id, {
      find_by: 'uuid',
    })
    obituary = {
      ...(story.data.story.content as Story<Omit<IObituary, '_id'>>['content']),
      date_created: story.data.story.first_published_at,
      date_updated: story.data.story.published_at,
      _id: story.data.story.uuid,
      is_crawled: false,
    }
  } else {
    obituary = JSON.parse(
      JSON.stringify(
        await db
          .collection<Omit<IObituary, '_id'>>('obituaries')
          .findOne({ _id: new ObjectID(params.id) })
      )
    )
  }
  const appreciations = (
    await db.collection<Omit<IAppreciation, '_id'>>('appreciations').findOne({
      _id: ObjectID.isValid(params.id)
        ? ObjectID.createFromHexString(params.id)
        : params.id,
    })
  ).quantity
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      ...obituary,
      appreciations,
    },
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
            .limit(100)
            .toArray()
        )
      ).flatMap((entry) => ({
        params: { id: entry._id, category: type },
      }))
    )
  )
  return {
    paths: paths.flat(),
    fallback: true,
  }
}
