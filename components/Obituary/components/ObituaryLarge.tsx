import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { formatDate } from '../../../utils/formatDate'
import { useTranslation } from 'next-i18next'
import { ObituaryImage } from './ObituaryImage'
import type { ObituaryRenderer } from '../ObituaryContainer'
import { formatName } from '../helpers/formatName'
import { useObituary } from 'hooks/reactQuery/queries'
import Image from 'next/image'
import { isMultiObituary } from 'lib/domain/isMultiObituary'
import { RichText } from 'components/RichText'
import { getImgSrc } from 'lib/domain/getImgSrc'
import { Timestamp } from 'components/Timestamp'

export const ObituaryLarge: ObituaryRenderer = ({
  onShowAppreciation,
  ...props
}) => {
  const [canShare, setCanShare] = useState(false)
  const { data } = useObituary(props._id, {
    initialData: props,
  })
  const {
    _id,
    firstname,
    name_misc,
    surname,
    date_of_birth,
    date_of_death,
    type,
    image,
    preamble,
    long_text,
    date_created,
    relative,
    additional_information,
    prefix,
    symbol_image,
    image_second,
    firstname_second,
    surname_second,
    date_of_birth_second,
    date_of_death_second,
  } = data
  const { t } = useTranslation()

  const createShareUrl = useCallback(() => {
    const translatedType = t(type)
    if (translatedType && _id) {
      return `${window.location.origin}/${translatedType}/${_id}`
    }
    return ''
  }, [_id, t, type])

  const shareToFacebook = useCallback(async () => {
    const shareUrl = createShareUrl()
    if (shareUrl) {
      window?.FB?.ui({
        display: 'popup',
        method: 'share',
        href: shareUrl,
      })
    }
  }, [createShareUrl])

  const share = useCallback(async () => {
    const shareUrl = createShareUrl()
    if (shareUrl) {
      try {
        await navigator?.share?.({ url: shareUrl })
      } catch {}
    }
  }, [createShareUrl])

  useEffect(() => {
    const shareUrl = createShareUrl()
    if (shareUrl && navigator?.canShare?.({ url: shareUrl })) {
      setCanShare(true)
    }
  }, [createShareUrl])

  return (
    <>
      <Box py={8} px={[4, 6, 10]}>
        <VStack spacing={4} mb={10}>
          <Text
            className="capitalize"
            width="fit-content"
            fontSize="sm"
            color="gray.400"
            mb={3}
          >
            {t(type)}
          </Text>
          <Flex
            gap={16}
            width="100%"
            justifyContent="center"
            alignItems="flex-start"
          >
            <VStack
              alignItems="center"
              justifyContent="center"
              spacing={3}
              flex={1}
            >
              <Box
                flexShrink={0}
                position="relative"
                width={150}
                height={180}
                borderStyle="solid"
                boxShadow="xl"
                borderRadius={5}
                borderWidth={1}
                borderColor="gray.400"
                mb="1rem"
              >
                <ObituaryImage img={image} />
              </Box>
              <Heading
                mt={2}
                textAlign="center"
                as="h1"
                lineHeight={1.1}
                fontSize={['2xl', '3xl', '3xl']}
              >
                {formatName({ prefix, firstname, surname, name_misc })}
              </Heading>
              <Timestamp
                size="large"
                type={type}
                from={date_of_birth}
                to={date_of_death}
              />
            </VStack>
            {isMultiObituary(props) && (
              <VStack
                alignItems="center"
                justifyContent="center"
                spacing={3}
                flex={1}
              >
                <Box
                  flexShrink={0}
                  position="relative"
                  width={150}
                  height={180}
                  borderStyle="solid"
                  boxShadow="xl"
                  borderRadius={5}
                  borderWidth={1}
                  borderColor="gray.400"
                  mb="1rem"
                >
                  <ObituaryImage img={image_second} />
                </Box>
                <Heading
                  mt={2}
                  textAlign="center"
                  as="h1"
                  lineHeight={1.1}
                  fontSize={['2xl', '3xl', '3xl']}
                >
                  {formatName({
                    firstname: firstname_second,
                    surname: surname_second,
                  })}
                </Heading>
                <Timestamp
                  size="large"
                  type={type}
                  from={date_of_birth_second}
                  to={date_of_death_second}
                />
              </VStack>
            )}
          </Flex>
          {preamble && (
            <Text
              fontStyle="italic"
              textAlign="center"
              color="blackAlpha.500"
              fontSize="lg"
            >
              {preamble}
            </Text>
          )}
          {symbol_image && (
            <Box width="100px" height="100px" pos="relative" mt="1rem">
              <Image
                alt={typeof symbol_image === 'string' ? '' : symbol_image?.alt}
                src={getImgSrc(symbol_image)}
                sizes="100vw"
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </Box>
          )}
        </VStack>
        <VStack spacing={5}>
          {long_text && (
            <Box
              textAlign={{ md: 'center' }}
              width="100%"
              maxW={800}
              mx="auto"
              alignItems="start"
            >
              <RichText richText={long_text} />
            </Box>
          )}
          {relative && (
            <Text py={6} fontSize={['sm', 'md']}>
              <b style={{ textTransform: 'capitalize' }}>{t('relatives')}:</b>{' '}
              {relative}
            </Text>
          )}
        </VStack>
      </Box>
      {additional_information && (
        <Text
          py={[6, 6, 8]}
          px={[4, 6, 10]}
          borderWidth={1}
          bg="gray.100"
          borderColor="gray.200"
          width="100%"
          fontSize="sm"
        >
          {additional_information}
        </Text>
      )}
      <Divider />
      <HStack py={[6, 6, 8]} px={[4, 6, 10]} justifyContent="space-between">
        <Box>
          <Text fontSize="small" fontWeight="bold">
            {t('published')}:
          </Text>
          <Text fontSize="small">{formatDate(date_created)}</Text>
        </Box>
        <div>
          {canShare && (
            <Button size={['sm', 'md']} onClick={share} marginRight={2}>
              {t('share')}
              <Image
                alt=""
                style={{
                  marginLeft: 8,
                  position: 'relative',
                  bottom: 1,
                }}
                width={20}
                height={20}
                src="/icons/share_icon.png"
              />
            </Button>
          )}
          <Button
            size={['sm', 'md']}
            colorScheme="facebook"
            onClick={shareToFacebook}
          >
            {t('share')}
            <svg
              style={{
                marginLeft: 8,
                position: 'relative',
                bottom: 1,
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
        </div>
      </HStack>
    </>
  )
}
