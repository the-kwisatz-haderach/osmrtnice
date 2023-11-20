import { Box, Container } from '@chakra-ui/react'
import { ObituaryContainer } from 'components/Obituary'
import { REVALIDATE_TIME_SECONDS } from 'lib/constants'
import Storyblok from 'lib/storyblok/client'
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

const capitalize = (str = '') => str?.[0]?.toLocaleUpperCase() + str.slice(1)

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

const parseStory = (story: any): Omit<IObituary, '_id'> => ({
  storyId: story.id,
  firstname: story.content.firstname,
  surname: story.content.surname,
  name_misc: story.content.name_misc,
  prefix: story.content.prefix,
  preamble: story.content.preamble,
  additional_information: story.content.additional_information,
  long_text: story.content.long_text,
  city: story.content.city,
  date_created: story.first_published_at,
  date_updated: story.published_at,
  date_of_birth: story.content.date_of_birth,
  date_of_death: story.content.date_of_death,
  faith: story.content.faith,
  is_crawled: false,
  relative: story.content.relative,
  size: story.content.size,
  type: story.content.type,
  image: story.content.image,
  image_second: story.content.image_second,
  firstname_second: story.content.firstname_second,
  surname_second: story.content.surname_second,
  date_of_birth_second: story.content.date_of_birth_second,
  date_of_death_second: story.content.date_of_death_second,
  appreciations: 0,
  symbol_image: {
    filename: story.content.symbol_image.filename,
    alt: story.content.symbol_image.alt,
  },
})

export const getStaticProps: GetStaticProps<
  Omit<IObituary, '_id'>,
  { id: string; category: string }
> = async ({ params, locale = 'hr' }) => {
  try {
    let obituary: Omit<IObituary, '_id'>

    // For previewing obituaries
    if (/(\d|[_-])+/.test(params.id)) {
      const story = await Storyblok.get(
        `cdn/stories/${params.category}/${params.id}`,
        {
          version: 'draft',
          language: locale,
          token: process.env.STORYBLOK_TOKEN,
        }
      )
      obituary = parseStory(story.data.story)
    } else {
      const { db } = await connectToDb()
      obituary = JSON.parse(
        JSON.stringify(
          await db.collection<Omit<IObituary, '_id'>>('obituaries').findOne({
            _id: ObjectID.isValid(params.id)
              ? ObjectID.createFromHexString(params.id)
              : new ObjectID(params.id),
          })
        )
      )
    }

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
  // const { db } = await connectToDb()
  // const paths = await Promise.all(
  //   obituaryTypes.flatMap(async (type) =>
  //     JSON.parse(
  //       JSON.stringify(
  //         await db
  //           .collection<IObituary>('obituaries')
  //           .find({
  //             type,
  //           })
  //           .limit(0)
  //           .toArray()
  //       )
  //     ).flatMap((entry: IObituary) => ({
  //       params: { id: entry._id, category: type },
  //     }))
  //   )
  // )
  return {
    // paths: paths.flat(),
    paths: [],
    fallback: 'blocking',
  }
}
