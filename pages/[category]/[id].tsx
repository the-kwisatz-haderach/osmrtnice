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
import { ObjectID } from 'mongodb'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { AppreciationIndicator } from '../../components/AppreciationIndicator'
import { RichText } from '../../components/RichText'
import { connectToDb } from '../../db'
import { obituaryTypeMap } from '../../lib/domain'
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
        <title>Obituary | {[firstname, middlename, surname].join(' ')}</title>
      </Head>
      <Box minHeight="50vh" mt={10}>
        <Container maxW="container.xl" p={5}>
          <Flex
            flexDir={['column', 'column', 'row']}
            alignItems={['center', 'center', 'flex-start']}
          >
            <Box
              mr={{ md: 12 }}
              mb={[4, 4, 0]}
              flexShrink={0}
              position="relative"
              width={200}
              height={200}
              borderStyle="solid"
              boxShadow="xl"
              borderRadius={5}
              borderWidth={1}
              borderColor="gray.400"
            >
              <Image src={image} layout="fill" />
            </Box>
            <VStack
              alignItems={['center', 'center', 'flex-start']}
              flex={1}
              justifyContent="flex-end"
            >
              <Heading as="h1" fontSize={['4xl', '6xl', '8xl']}>
                {[firstname, middlename, surname].join(' ')}
              </Heading>
              <HStack
                fontSize={['lg', '2xl', '4xl']}
                spacing={1}
                fontWeight="bold"
              >
                {date_of_birth ? <Text>{formatDate(date_of_birth)}</Text> : ''}
                {(date_of_birth || date_of_death) && <Text>-</Text>}
                {date_of_death ? <Text>{formatDate(date_of_death)}</Text> : ''}
              </HStack>
            </VStack>
          </Flex>
          <Container maxW="container.xl" mt={5}>
            <Text fontSize={['lg', '2xl']}>{preamble}</Text>
          </Container>
        </Container>
        <Box backgroundColor="orange.400">
          <Container
            maxW="container.xl"
            py={[10, 16]}
            px={[6, 10]}
            my={5}
            color="white"
            fontSize={['lg', '2xl']}
          >
            {long_text}
          </Container>
        </Box>
      </Box>
    </div>
  )
}

export const getStaticProps: GetStaticProps<
  IObituary,
  { id: string; category: string }
> = async ({ params }) => {
  const { db } = await connectToDb()
  const obituary = JSON.parse(
    JSON.stringify(
      await db
        .collection<Omit<IObituary, '_id'>>('obituaries')
        .findOne({ _id: new ObjectID(params.id) })
    )
  )
  return {
    props: obituary,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { db } = await connectToDb()
  const paths = await Promise.all(
    Object.entries(obituaryTypeMap).flatMap(async ([slug, type]) =>
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
        params: { id: entry._id, category: slug },
        locale: 'en',
      }))
    )
  )
  return {
    paths: paths.flat(),
    fallback: true,
  }
}
