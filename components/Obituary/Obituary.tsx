import React, { ReactElement, useState } from 'react'
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import { formatDate } from '../../utils/formatDate'
import { IObituary } from '../../lib/domain/types'
import { AppreciationIndicator } from '../AppreciationIndicator'
import { Link } from '../Link'
import { useTranslation } from 'next-i18next'
import { useIncrementAppreciation } from '../../hooks/reactQuery/mutations'
import useModal from '../../contexts/ModalContext/'
import Storyblok from '../../lib/storyblok/client'

const htmlTagsRegexp = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g

interface Props extends IObituary {
  appreciations: number
}

export default function Obituary(props: Props): ReactElement {
  const {
    image,
    _id,
    type,
    preamble,
    long_text,
    date_of_birth,
    date_of_death,
    appreciations,
    faith,
    firstname,
    name_misc,
    surname,
    prefix,
  } = props
  const fullname =
    (prefix ? `${prefix} ` : '') +
    [firstname, surname].join(' ') +
    (name_misc ? ` - ${name_misc}` : '')
  const { t } = useTranslation()
  const [src, setSrc] = useState(
    image
      ? image.startsWith('http')
        ? image
        : `https:${image}`
      : '/images/placeholder-obit-image.jpeg'
  )
  const isClicked = Boolean(
    typeof window !== 'undefined' && window.localStorage.getItem(_id)
  )
  const formattedType = t(type.toLowerCase().replace('_', '-'))
  const { mutate } = useIncrementAppreciation()
  const onClickAppreciation = () =>
    mutate({ id: _id, increment: isClicked ? -1 : 1 })

  const { open } = useModal()
  const openModal = () => {
    open('ObituaryModal', {
      props,
      rootModalProps: {
        size: 'xl',
        colorScheme: 'orange',
      },
    })
  }

  return (
    <Box
      height="100%"
      transition="box-shadow 0.3s ease-in-out"
      borderColor={isClicked ? 'orange.200' : 'gray.200'}
      borderWidth={1}
      borderStyle="solid"
      borderRadius="sm"
      _hover={{
        boxShadow: `0 20px 25px -5px rgba(${
          isClicked ? '222,135,31,0.2' : '0,0,0,0.1'
        }), 0 10px 10px -5px rgba(${
          isClicked ? '222,107,31,0.1' : '0,0,0,0.04'
        })`,
      }}
    >
      <VStack p={6} flexDir="column" spacing={3} h="100%">
        <Text
          className="capitalize"
          width="fit-content"
          fontSize="xs"
          color="gray.400"
        >
          {t(type)}
        </Text>
        <Box
          borderStyle="solid"
          borderWidth={1}
          borderColor="gray.300"
          width={140}
          height={140}
          position="relative"
          onClick={openModal}
          cursor="pointer"
        >
          <Image
            src={src}
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/placeholder-person.png"
            onError={() => setSrc('/images/placeholder-obit-image.jpeg')}
          />
        </Box>
        <VStack textAlign="center" spacing={3}>
          {preamble && (
            <Text fontSize="sm" fontStyle="italic">
              {preamble}
            </Text>
          )}
          <Box>
            <Heading
              onClick={openModal}
              cursor="pointer"
              as="h4"
              fontSize="2xl"
              mb={2}
            >
              {fullname}
            </Heading>
            <HStack
              hidden={!date_of_birth && !date_of_death}
              spacing={1}
              justify="center"
              fontWeight="bold"
            >
              <Text fontSize="sm" hidden={!date_of_birth}>
                {formatDate(date_of_birth, {
                  year: 'numeric',
                })}
              </Text>
              <Text hidden={!date_of_birth || !date_of_death} fontSize="sm">
                -
              </Text>
              <Text fontSize="sm" hidden={!date_of_death}>
                {formatDate(date_of_death, {
                  year: 'numeric',
                })}
              </Text>
            </HStack>
          </Box>
        </VStack>
        {long_text && (
          <Text
            className="capitalize"
            textAlign="justify"
            fontSize="sm"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 6,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {typeof long_text === 'string'
              ? long_text.replace(htmlTagsRegexp, '')
              : Storyblok.richTextResolver
                  .render(long_text)
                  .replace(htmlTagsRegexp, '')}
          </Text>
        )}
        <Divider flex={1} alignSelf="flex-end" />
        <Flex alignItems="flex-end" justifyContent="space-between" width="100%">
          <AppreciationIndicator
            appreciations={appreciations}
            faithType={faith}
            isClicked={isClicked}
            onClick={onClickAppreciation}
          />
          <Link
            onClick={openModal}
            href={`/${formattedType}/${_id}`}
            prefetch={false}
          >
            {t('search-results-view_full')}
          </Link>
        </Flex>
      </VStack>
    </Box>
  )
}
