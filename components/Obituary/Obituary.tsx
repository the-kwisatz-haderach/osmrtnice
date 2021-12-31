import React, { ReactElement, useEffect, useState } from 'react'
import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { RichText } from '../RichText'
import { formatDate } from '../../utils/formatDate'
import { IObituary } from '../../lib/domain/types'
import { AppreciationIndicator } from '../AppreciationIndicator'
import axios from 'axios'
import { Link } from '../Link'

export default function Obituary({
  _id,
  firstname,
  middlename,
  surname,
  preamble,
  long_text,
  relative,
  date_of_birth,
  date_of_death,
  image,
  additional_information,
  appreciations,
  faith,
  size = 'regular',
  type = 'OBITUARY',
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
    <VStack
      flexDir="column"
      spacing={5}
      p={6}
      borderRadius="sm"
      h="100%"
      transition="box-shadow 0.3s ease-in-out"
      borderColor="gray.200"
      borderWidth={1}
      borderStyle="solid"
      _hover={{
        boxShadow: 'lg',
      }}
    >
      <Text>{type}</Text>
      {image && (
        <Box
          borderStyle="solid"
          borderWidth={1}
          borderColor="gray.300"
          width={140}
          height={140}
          position="relative"
        >
          <Image
            src={image.startsWith('http') ? image : `https:${image}`}
            layout="fill"
          />
        </Box>
      )}
      <VStack textAlign="center" spacing={3}>
        {preamble && (
          <Text fontSize="sm" fontStyle="italic">
            {preamble}
          </Text>
        )}
        <Box>
          <Heading as="h4" fontSize="2xl" mb={2}>
            {[firstname, middlename, surname].join(' ')}
          </Heading>
          <HStack spacing={1} justify="center" fontWeight="bold">
            {date_of_birth ? (
              <Text fontSize="sm">{formatDate(date_of_birth)}</Text>
            ) : (
              ''
            )}
            {(date_of_birth || date_of_death) && <Text fontSize="sm">-</Text>}
            {date_of_death ? (
              <Text fontSize="sm">{formatDate(date_of_death)}</Text>
            ) : (
              ''
            )}
          </HStack>
        </Box>
      </VStack>
      {long_text &&
        (typeof long_text === 'string' ? (
          <Text
            fontSize="sm"
            textAlign="justify"
            sx={{
              '&::first-letter': {
                textTransform: 'uppercase',
              },
            }}
          >
            {long_text}
          </Text>
        ) : (
          <RichText textAlign="justify">{long_text}</RichText>
        ))}
      {relative != null && relative.length > 0 && (
        <HStack wrap="wrap" justifyContent="center">
          {relative.split(', ').map((relation) => (
            <Text fontSize="xs" key={relation}>
              {relation}
            </Text>
          ))}
        </HStack>
      )}
      {additional_information && (
        <Box borderTopStyle="dotted" borderTopWidth={2} pt={4} w="100%">
          <Text fontSize="xs">{additional_information}</Text>
        </Box>
      )}
      <Flex
        alignItems="flex-end"
        justifyContent="space-between"
        width="100%"
        flex={1}
      >
        <AppreciationIndicator
          appreciations={localAppreciations}
          faithType={faith}
          isClicked={isClicked}
          onClick={onShowAppreciation}
        />
        <Link href={`/obituaries/${_id}`}>View full</Link>
      </Flex>
    </VStack>
  )
}
