import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import axios from 'axios'
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
import { TextBlock } from '../../components/TextBlock'
import { connectToDb } from '../../db'
import { createMetaTitle, obituaryTypes } from '../../lib/domain'
import { IObituary } from '../../lib/domain/types'
import { formatDate } from '../../utils/formatDate'

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
}: IObituary): ReactElement {
  const { isFallback } = useRouter()
  const { t } = useTranslation()
  const [src, setSrc] = useState(
    image
      ? image.startsWith('http')
        ? image
        : `https:${image}`
      : '/images/placeholder-obit-image.jpeg'
  )
  const [localAppreciations, setLocalAppreciations] = useState(appreciations)
  const [isClicked, setIsClicked] = useState(
    Boolean(
      typeof window !== 'undefined' && window.localStorage.getItem(_id)
    ) || false
  )

  const onShowAppreciation = async () => {
    try {
      await axios.post(`/api/obituaries/${_id}/appreciation/increment`, {
        increment: isClicked ? -1 : 1,
      })
      if (isClicked) {
        window.localStorage.removeItem(_id)
        setLocalAppreciations((curr) => curr - 1)
      } else {
        window.localStorage.setItem(_id, 'true')
        setLocalAppreciations((curr) => curr + 1)
      }
      setIsClicked((curr) => !curr)
    } catch (err) {
      console.error(err)
    }
  }

  if (isFallback) {
    return <></>
  }

  return (
    <div>
      <Head>
        <title>
          {createMetaTitle(
            capitalize(t(type)),
            [firstname, middlename, surname].join(' ')
          )}
          {preamble && <meta name="description" content={preamble} />}
          {image && <meta property="og:image" content={image} />}
          {typeof long_text === 'string' && (
            <meta property="og:description" content={long_text} />
          )}
          <meta
            property="og:title"
            content={createMetaTitle(
              capitalize(t(type)),
              [firstname, middlename, surname].join(' ')
            )}
          />
        </title>
      </Head>
      <Box minHeight="50vh" my={[10, 20]}>
        <Container
          maxW="container.lg"
          boxShadow={{ lg: 'xl' }}
          borderColor="gray.200"
          borderWidth={{ lg: 1 }}
          borderStyle="solid"
          borderRadius={5}
          p={[4, 6, 10]}
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
                {[firstname, middlename, surname].join(' ')}
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
                py={[6, 8, 12]}
                px={[6, 10, 16]}
                backgroundColor="orange.400"
                color="white"
                align="start"
                mx={{ md: -10 }}
              >
                <Text fontSize={['lg', 'xl', '2xl']}>{long_text}</Text>
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
              {
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
              }
              <TextBlock
                flex={1}
                backgroundColor="gray.100"
                label={t('pay_respects')}
              >
                <AppreciationIndicator
                  size="large"
                  appreciations={localAppreciations}
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
  const { db } = await connectToDb()
  const obituary = JSON.parse(
    JSON.stringify(
      await db
        .collection<Omit<IObituary, '_id'>>('obituaries')
        .findOne({ _id: new ObjectID(params.id) })
    )
  )
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      ...obituary,
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
