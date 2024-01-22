import React, { useCallback } from 'react'
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Link } from '../../Link'
import { useTranslation } from 'next-i18next'
import useModal from '../../../contexts/ModalContext'
import { ObituaryImage } from './ObituaryImage'
import { formatName } from '../helpers/formatName'
import { ObituaryRenderer } from '../ObituaryContainer'
import { isMultiObituary } from 'lib/domain/isMultiObituary'
import { RichText } from 'components/RichText'
import { Timestamp } from '../../Timestamp'
import { useUpdateObituary } from 'hooks/reactQuery/mutations'
import { useAdminContext } from 'contexts/AdminContext'

const htmlTagsRegexp = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g

export const Obituary: ObituaryRenderer = (props) => {
  const isAdmin = useAdminContext()
  const { mutate, isLoading } = useUpdateObituary()
  const {
    image = '',
    _id,
    type = 'obituary',
    preamble = '',
    long_text = '',
    date_of_birth = '',
    date_of_death = '',
    firstname = '',
    name_misc = '',
    surname = '',
    prefix = '',
    image_second,
    firstname_second,
    surname_second,
    date_of_birth_second,
    date_of_death_second,
    disabled,
  } = props
  const { t } = useTranslation()
  const isClicked =
    typeof window !== 'undefined' && window.localStorage.getItem(_id) !== null

  const formattedType = t(type.toLowerCase().replace('_', '-'))

  const { open } = useModal()
  const openModal = useCallback(() => {
    open('ObituaryModal', {
      props,
      rootModalProps: {
        size: 'xl',
        colorScheme: 'brand',
      },
    })
  }, [open, props])

  const handleDisable = () => {
    mutate({ _id, disabled: !disabled })
  }

  return (
    <Box
      height="100%"
      transition="box-shadow 0.3s ease-in-out"
      borderColor={isClicked ? 'brand.200' : 'gray.200'}
      borderWidth={1}
      borderStyle="solid"
      borderRadius="sm"
      bg={disabled ? 'gray.100' : 'unset'}
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
        <Flex gap={10} opacity={disabled ? 0.5 : 1}>
          <VStack textAlign="center" spacing={3}>
            <Box
              borderStyle="solid"
              borderWidth={1}
              borderColor="gray.300"
              width={125}
              height={150}
              position="relative"
              onClick={openModal}
              cursor="pointer"
            >
              <ObituaryImage img={image} />
            </Box>
            <Box>
              <Heading
                onClick={openModal}
                cursor="pointer"
                as="h4"
                fontSize="2xl"
                mb={2}
              >
                {formatName({ prefix, firstname, surname, name_misc })}
              </Heading>
              <Timestamp type={type} from={date_of_birth} to={date_of_death} />
            </Box>
          </VStack>
          {isMultiObituary(props) && (
            <VStack textAlign="center" spacing={3}>
              <Box
                borderStyle="solid"
                borderWidth={1}
                borderColor="gray.300"
                width={125}
                height={150}
                position="relative"
                onClick={openModal}
                cursor="pointer"
              >
                <ObituaryImage img={image_second} />
              </Box>
              <Box>
                <Heading
                  onClick={openModal}
                  cursor="pointer"
                  as="h4"
                  fontSize="2xl"
                  mb={2}
                >
                  {formatName({
                    firstname: firstname_second,
                    surname: surname_second,
                  })}
                </Heading>
                <Timestamp
                  type={type}
                  from={date_of_birth_second}
                  to={date_of_death_second}
                />
              </Box>
            </VStack>
          )}
        </Flex>
        {preamble && (
          <Text fontSize="sm" fontStyle="italic" opacity={disabled ? 0.5 : 1}>
            {preamble}
          </Text>
        )}
        {long_text && (
          <Text
            className="capitalize"
            textAlign="justify"
            fontSize="sm"
            opacity={disabled ? 0.5 : 1}
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 6,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            <RichText
              richText={
                typeof long_text === 'string'
                  ? long_text.replace(htmlTagsRegexp, '')
                  : long_text
              }
            />
          </Text>
        )}
        <Divider flex={1} alignSelf="flex-end" />
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          {isAdmin ? (
            <Button
              onClick={handleDisable}
              isLoading={isLoading}
              disabled={isLoading}
              colorScheme={!disabled ? 'red' : 'green'}
              size="sm"
            >
              {disabled ? t('show') : t('hide')}
            </Button>
          ) : (
            <div />
          )}
          <Link
            onClick={openModal}
            href={`/${formattedType}/${_id}`}
            prefetch={false}
            bold
          >
            {t('search-results-view_full')}
          </Link>
        </Flex>
      </VStack>
    </Box>
  )
}
