import React, { ReactElement } from 'react'
import Image from 'next/image'
import { RichText } from '../RichText'
import { formatDate } from '../../utils/formatDate'
import { IObituary } from '../../lib/domain/types'
import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'

export default function Obituary({
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
  slug,
  size = 'regular',
  type = 'OBITUARY',
}: IObituary & { slug?: string }): ReactElement {
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
      {image && (
        <Image
          src={image.startsWith('http') ? image : `https:${image}`}
          width={140}
          height={140}
        />
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
          <HStack spacing={1}>
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
          <Text fontSize="sm" textAlign="justify">
            {long_text}
          </Text>
        ) : (
          <RichText textAlign="justify">{long_text}</RichText>
        ))}
      {relative != null && relative.length > 0 && (
        <Flex flexWrap="wrap" justifyContent="center">
          {relative.split(', ').map((relation) => (
            <Text fontSize="xs" key={relation}>
              {relation}
            </Text>
          ))}
        </Flex>
      )}
      {additional_information && (
        <Box borderTopStyle="dotted" borderTopWidth={2} pt={4} w="100%">
          <Text fontSize="xs">{additional_information}</Text>
        </Box>
      )}
    </VStack>
  )
}
