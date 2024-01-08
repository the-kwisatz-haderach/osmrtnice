import { HStack, Text, VStack, Link as ChakraLink, Box } from '@chakra-ui/react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement } from 'react'
import { Link } from '../Link'
import {
  faPhone as phoneIcon,
  faMailBulk as mailIcon,
} from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

interface InfoItem {
  content: string[]
  label?: string
  href?: string
  icon?: IconDefinition
  isMailto?: boolean
}

interface Props {
  email: string
  phoneNumbers: string[]
}

const formatPhoneNumber = (number: string) => number.replace(/\s+/g, '')

export default function ContactInfo({
  email,
  phoneNumbers,
}: Props): ReactElement {
  const { t } = useTranslation()
  return (
    <VStack spacing={3} alignItems="flex-start">
      <Box>
        <Text fontWeight="bold" mb={1}>
          <FontAwesomeIcon style={{ marginRight: 4 }} icon={phoneIcon} />{' '}
          {t('phone')}
        </Text>
        {phoneNumbers.map((number) => (
          <Link key={number} href={`tel:${formatPhoneNumber(number)}`}>
            <Text>{number}</Text>
          </Link>
        ))}
      </Box>
      <Box>
        <Text fontWeight="bold" mb={1}>
          <FontAwesomeIcon style={{ marginRight: 4 }} icon={mailIcon} />{' '}
          {t('mail')}
        </Text>
        <ChakraLink
          color="brand.500"
          isExternal
          rel="noopener noreferrer"
          href={`mailto:${email}`}
        >
          {email}
        </ChakraLink>
      </Box>
    </VStack>
  )
}
