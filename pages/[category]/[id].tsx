import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { capitalize } from 'lodash'
import { ObjectID } from 'mongodb'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { AppreciationIndicator } from '../../components/AppreciationIndicator'
import { RichText } from '../../components/RichText'
import { TextBlock } from '../../components/TextBlock'
import { connectToDb } from '../../db'
import { useIncrementAppreciation } from '../../hooks/reactQuery/mutations'
import { createMetaTitle, obituaryTypes } from '../../lib/domain'
import { IAppreciation, IObituary } from '../../lib/domain/types'
import Storyblok from '../../lib/storyblok/client'
import { Story } from '../../lib/storyblok/types'
import { formatDate } from '../../utils/formatDate'

interface Props extends IObituary {
  appreciations: number
}

export default function Obituary({
  _id,
  firstname,
  middlename,
  surname,
  date_of_birth,
  date_of_death,
  image,
  preamble,
  long_text,
  date_created,
  date_updated,
  appreciations,
  faith,
  relative,
  additional_information,
  type,
}: Props): ReactElement {
  const fullname = [firstname, middlename, surname].join(' ')
  const { isFallback } = useRouter()
  const { t } = useTranslation()
  const [src, setSrc] = useState(
    image
      ? image.startsWith('http')
        ? image
        : `https:${image}`
      : '/images/placeholder-obit-image.jpeg'
  )
  const [isClicked, setIsClicked] = useState(
    Boolean(
      typeof window !== 'undefined' && window.localStorage.getItem(_id)
    ) || false
  )

  const { mutate, data } = useIncrementAppreciation()

  const onShowAppreciation = async () => {
    mutate(
      {
        id: _id,
        increment: isClicked ? -1 : 1,
      },
      {
        onSuccess: () => {
          if (isClicked) {
            window.localStorage.removeItem(_id)
          } else {
            window.localStorage.setItem(_id, 'true')
          }
          setIsClicked((curr) => !curr)
        },
      }
    )
  }

  const shareToFacebook = () => {
    window?.FB?.ui({
      display: 'popup',
      method: 'share',
      href: window.location.href,
    })
  }

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
          <VStack mb={10}>
            <Box
              flexShrink={0}
              position="relative"
              width={200}
              height={200}
              borderStyle="solid"
              boxShadow="xl"
              borderRadius={5}
              borderWidth={1}
              borderColor="gray.400"
              mb={3}
            >
              <Image
                src={src}
                layout="fill"
                placeholder="blur"
                blurDataURL="/images/placeholder-person.png"
                onError={() => setSrc('/images/placeholder-obit-image.jpeg')}
              />
            </Box>
            <VStack
              alignItems="center"
              flex={1}
              justifyContent="center"
              spacing={4}
            >
              <Heading
                textAlign="center"
                as="h1"
                lineHeight={1.1}
                fontSize={['4xl', '6xl', '8xl']}
              >
                {fullname}
              </Heading>
              {(date_of_birth || date_of_death) && (
                <HStack fontSize={['lg', '2xl', '4xl']} fontWeight="bold">
                  {date_of_birth ? (
                    <Text>{formatDate(date_of_birth)}</Text>
                  ) : (
                    ''
                  )}
                  {(date_of_birth || date_of_death) && <Text>-</Text>}
                  {date_of_death ? (
                    <Text>{formatDate(date_of_death)}</Text>
                  ) : (
                    ''
                  )}
                </HStack>
              )}
            </VStack>
            {preamble && (
              <Text
                fontStyle="italic"
                textAlign="center"
                color="blackAlpha.500"
                fontSize={['lg', '2xl']}
              >
                {preamble}
              </Text>
            )}
          </VStack>
          <VStack spacing={5}>
            {long_text && (
              <Box
                width="100%"
                py={[6, 8, 12]}
                px={[6, 10, 16]}
                backgroundColor="orange.400"
                color="white"
                align="start"
                mx={{ md: -10 }}
              >
                {typeof long_text === 'string' ? (
                  <Text fontSize={['lg', 'xl', '2xl']}>{long_text}</Text>
                ) : (
                  <RichText>{long_text}</RichText>
                )}
              </Box>
            )}
            {relative && (
              <Flex py={[2, 4]} px={[4, 6]} width="100%">
                <Text fontSize={['md', 'lg']}>{relative}</Text>
              </Flex>
            )}
            {additional_information && (
              <Flex py={[2, 4]} px={[4, 6]} width="100%">
                <Text fontSize={['md', 'lg']}>{additional_information}</Text>
              </Flex>
            )}
            <Flex
              textAlign="center"
              width="100%"
              flexWrap="wrap"
              sx={{
                '& > *': {
                  m: 2,
                },
              }}
            >
              <TextBlock
                flex={1}
                color="white"
                backgroundColor="gray.700"
                label={t('published')}
              >
                <Text fontSize={['md', 'lg']}>{formatDate(date_created)}</Text>
              </TextBlock>
              <TextBlock
                flex={1}
                color="white"
                backgroundColor="gray.700"
                label={t('updated')}
              >
                <Text fontSize={['md', 'lg']}>
                  {formatDate(date_updated) || 'N/A'}
                </Text>
              </TextBlock>
              <TextBlock flex={1} backgroundColor="gray.100">
                <Button colorScheme="facebook" onClick={shareToFacebook}>
                  {t('share')}
                  <svg
                    style={{
                      marginLeft: 8,
                    }}
                    width={20}
                    height={20}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="white"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                  </svg>
                </Button>
              </TextBlock>
              <TextBlock
                flex={1}
                backgroundColor="gray.100"
                label={t('pay_respects')}
              >
                <AppreciationIndicator
                  size="large"
                  appreciations={data?.quantity ?? appreciations}
                  onClick={onShowAppreciation}
                  isClicked={isClicked}
                  faithType={faith}
                />
              </TextBlock>
            </Flex>
          </VStack>
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
