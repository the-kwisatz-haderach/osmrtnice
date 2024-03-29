import { Box, Container } from '@chakra-ui/react'
import { getStoryblokApi, useStoryblokState } from '@storyblok/react'
import { ObituaryContainer } from 'components/Obituary'
import { parseObituaryStory } from 'lib/domain/parseObituaryStory'
import { Story } from 'lib/storyblok/types'
import { ObjectId } from 'mongodb'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { ObituaryLarge } from '../../components/Obituary/components/ObituaryLarge'
import { connectToDb } from '../../db'
import { createMetaTitle } from '../../lib/domain'
import { IObituary } from '../../lib/domain/types'
import { stringifyLongText } from 'lib/domain/formatLongText'

const capitalize = (str = '') => str?.[0]?.toLocaleUpperCase() + str.slice(1)

interface Props {
  story?: Story<IObituary>
  obituary?: IObituary
}

export default function Obituary({
  story: initialStory,
  obituary: initialObituary,
}: Props): ReactElement {
  const story = useStoryblokState(initialStory)
  const { t } = useTranslation()
  const obituary = initialObituary || parseObituaryStory(story)
  const {
    firstname,
    name_misc,
    surname,
    preamble,
    image,
    long_text,
    type,
  } = obituary
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
        {long_text && (
          <meta
            property="og:description"
            content={stringifyLongText(long_text)}
          />
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
          <ObituaryContainer
            _id={initialObituary?._id}
            {...obituary}
            Renderer={ObituaryLarge}
          />
        </Container>
      </Box>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string; category: string }
> = async ({ params, locale = 'hr' }) => {
  try {
    // For previewing obituaries
    if (!/\d/.test(params.id)) {
      const storyblokApi = getStoryblokApi()
      const story = await storyblokApi.get(
        `cdn/stories/${params.category}/${params.id}`,
        {
          version: 'draft',
          language: locale,
          token: process.env.STORYBLOK_TOKEN,
        }
      )
      return {
        props: {
          ...(await serverSideTranslations(locale, ['common'])),
          story: story?.data?.story,
        },
      }
    }
    const { db } = await connectToDb()
    const obituary = JSON.parse(
      JSON.stringify(
        await db.collection<Omit<IObituary, '_id'>>('obituaries').findOne({
          _id: ObjectId.isValid(params.id)
            ? ObjectId.createFromHexString(params.id)
            : new ObjectId(params.id),
        })
      )
    )

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        obituary,
      },
    }
  } catch (err) {
    console.error(err)
    return {
      notFound: true,
    }
  }
}
