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
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import React, { ReactElement, useState } from 'react'
import { AppreciationIndicator } from '../../components/AppreciationIndicator'
import { RichText } from '../../components/RichText'
import { connectToDb } from '../../db'
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
}: IObituary): ReactElement {
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
  return (
    <Box
      minHeight="50vh"
      backgroundImage="linear-gradient(to bottom, #de6b1fad, #de6b1fad)"
      backgroundRepeat="no-repeat"
      backgroundSize="auto 50%"
    >
      <Container maxW="container.xl" pt={20} px={[2, 4]}>
        <Box
          p={[5, 5, 10]}
          borderColor="gray.200"
          borderWidth={2}
          borderStyle="solid"
          backgroundColor="white"
          maxW={{ md: 800 }}
          boxShadow="xl"
          margin="auto"
        >
          <VStack align="flex-start" spacing={5}>
            <Flex width="100%" flexDir={['column', 'row']} alignItems="center">
              <Box
                mr={{ sm: 8 }}
                mb={[4, 0]}
                flexShrink={0}
                position="relative"
                width={150}
                height={150}
                borderStyle="solid"
                borderWidth={1}
                borderColor="gray.300"
              >
                <Image src={image} layout="fill" />
              </Box>
              <VStack alignItems={['center', 'flex-start']}>
                <Heading as="h1" size="3xl">
                  {[firstname, middlename, surname].join(' ')}
                </Heading>
                <HStack size="xl" spacing={1} fontWeight="bold">
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
                <Text fontSize={{ md: 'lg' }} fontStyle="italic">
                  {preamble}
                </Text>
              </VStack>
            </Flex>
            {typeof long_text === 'string' ? (
              <p>{long_text}</p>
            ) : (
              <RichText>{long_text}</RichText>
            )}
            {relative != null && relative.length > 0 && (
              <HStack wrap="wrap" justifyContent="center">
                {relative.split(', ').map((relation) => (
                  <Text key={relation}>{relation}</Text>
                ))}
              </HStack>
            )}
            {additional_information && (
              <Box borderTopStyle="dotted" borderTopWidth={2} pt={4} w="100%">
                <Text fontSize="xs">{additional_information}</Text>
              </Box>
            )}
            <Flex
              width="100%"
              alignItems="center"
              justify="space-between"
              wrap="wrap"
            >
              <Flex fontSize="xs" wrap="wrap">
                <Flex flexShrink={0} mr={2}>
                  <Text mr={1} fontWeight="bold">
                    Published:{' '}
                  </Text>
                  <Text color="gray.500">{formatDate(date_created)}</Text>
                </Flex>
                {date_created && (
                  <Flex flexShrink={0}>
                    <Text mr={1} fontWeight="bold">
                      Updated:{' '}
                    </Text>
                    <Text color="gray.500">{formatDate(date_created)}</Text>
                  </Flex>
                )}
              </Flex>
              <AppreciationIndicator
                appreciations={localAppreciations}
                faithType={faith}
                isClicked={isClicked}
                onClick={onShowAppreciation}
              />
            </Flex>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

export const getStaticProps: GetStaticProps<
  IObituary,
  { id: string }
> = async ({ params }) => {
  const { db } = await connectToDb()
  const obituary = JSON.parse(
    JSON.stringify(
      await db.collection<IObituary>('obituaries').findOne({ _id: params.id })
    )
  )
  return {
    props: obituary,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { db } = await connectToDb()
  const obituaries = JSON.parse(
    JSON.stringify(
      await db.collection<IObituary>('obituaries').find({}).limit(100).toArray()
    )
  )
  return {
    paths: obituaries.map((obituary) => ({
      params: { id: obituary._id.toString() },
      locale: 'en',
    })),
    fallback: false,
  }
}
