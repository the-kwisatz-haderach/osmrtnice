import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useCallback } from 'react'
import { RichText } from '../../RichText'
import { formatDate } from '../../../utils/formatDate'
// import { AppreciationIndicator } from '../../AppreciationIndicator'
import { useTranslation } from 'next-i18next'
import { TextBlock } from '../../TextBlock'
import { ObituaryImage } from './ObituaryImage'
import { ObituaryRenderer } from '../ObituaryContainer'
import { formatName } from '../helpers/formatName'
import { useObituary } from 'hooks/reactQuery/queries'

export const ObituaryLarge: ObituaryRenderer = ({
  onShowAppreciation,
  ...props
}) => {
  const { data } = useObituary(props._id, {
    initialData: props,
  })
  const {
    firstname,
    name_misc,
    surname,
    date_of_birth,
    date_of_death,
    image,
    preamble,
    long_text,
    date_created,
    date_updated,
    relative,
    additional_information,
    is_crawled,
    prefix,
  } = data
  const fullname = formatName({ prefix, firstname, surname, name_misc })
  const { t } = useTranslation()
  // const isClicked =
  //   typeof window !== 'undefined' && window.localStorage.getItem(_id) !== null

  const shareToFacebook = useCallback(() => {
    window?.FB?.ui({
      display: 'popup',
      method: 'share',
      href: window.location.href,
    })
  }, [])

  return (
    <Box py={8}>
      <VStack mb={10} px={[4, 6, 10]}>
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
          <ObituaryImage imgSrc={image} />
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
            fontSize={['3xl', '4xl', '6xl']}
          >
            {fullname}
          </Heading>
          <HStack
            hidden={!date_of_birth && !date_of_death}
            fontSize={['lg', 'xl', '4xl']}
            fontWeight="bold"
          >
            <Text hidden={!date_of_birth}>
              {formatDate(date_of_birth, {
                year: 'numeric',
              })}
            </Text>
            <Text hidden={!(date_of_birth && date_of_death)}>-</Text>
            <Text hidden={!date_of_death}>
              {formatDate(date_of_death, {
                year: 'numeric',
              })}
            </Text>
          </HStack>
        </VStack>
        {preamble && (
          <Text
            fontStyle="italic"
            textAlign="center"
            color="blackAlpha.500"
            fontSize={['lg', 'xl']}
          >
            {preamble}
          </Text>
        )}
      </VStack>
      <VStack spacing={5}>
        {long_text && (
          <Box
            textAlign={is_crawled ? 'center' : 'unset'}
            width="100%"
            alignItems="start"
            mx={{ md: -10 }}
            px={[4, 6, 10]}
          >
            <RichText>{long_text}</RichText>
          </Box>
        )}
        {relative && (
          <Flex width="100%" backgroundColor="orange.400" color="white">
            <Text py={6} px={[4, 6, 10]} fontSize={['sm', 'md']}>
              <b style={{ textTransform: 'capitalize' }}>{t('relatives')}:</b>{' '}
              {relative}
            </Text>
          </Flex>
        )}
        {additional_information && (
          <Flex px={[4, 6, 10]} width="100%">
            <Text
              p={5}
              borderWidth={1}
              borderStyle="dashed"
              borderColor="gray.200"
              width="100%"
              fontSize={['sm', 'md']}
            >
              {additional_information}
            </Text>
          </Flex>
        )}
        <Flex
          px={[2, 4, 8]}
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
            <Text fontSize={['sm', 'md', 'lg']}>
              {formatDate(date_created)}
            </Text>
          </TextBlock>
          <TextBlock
            flex={1}
            color="white"
            backgroundColor="gray.700"
            label={t('updated')}
          >
            <Text fontSize={['sm', 'md', 'lg']}>
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
          {/* <TextBlock
            flex={1}
            backgroundColor="gray.100"
            label={t('pay_respects')}
          >
            <AppreciationIndicator
              size="large"
              appreciations={appreciations}
              onClick={onShowAppreciation}
              isClicked={isClicked}
              faithType={faith}
            />
          </TextBlock> */}
        </Flex>
      </VStack>
    </Box>
  )
}
