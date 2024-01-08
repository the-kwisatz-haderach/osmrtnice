import React, { ReactElement, DetailedHTMLProps } from 'react'
import { IMenuItem } from '../../lib/storyblok/types'
import { Box, Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { ContactInfo } from 'components/ContactInfo'
import { Link } from 'components/Link'
import { Contained } from 'components/Contained/Contained'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { SITE_NAME } from 'lib/domain'

interface Props
  extends DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  menuItems: IMenuItem[]
  ingress: string
  phone: string
  email: string
  logoSrc?: string
}

export default function Footer({
  menuItems,
  ingress,
  phone,
  email,
  logoSrc,
}: Props): ReactElement {
  const { t } = useTranslation()
  return (
    <Box
      display="flex"
      flexDir="column"
      flex={1}
      as="footer"
      backgroundColor="gray.200"
    >
      <Contained py={10}>
        <Flex width={['100%', '100%', '50%']} flexWrap="wrap">
          <Box mr={[0, 8, 8, 16]} mb={8}>
            <Heading as="h3" size="xl" mb={4}>
              {t('contact-details')}
            </Heading>
            <Text mb={4}>{ingress}</Text>
            <ContactInfo email={email} phoneNumbers={phone.split(/,\s+/)} />
          </Box>
          <Box>
            <Heading as="h3" size="xl" mb={4}>
              {t('pages')}
            </Heading>
            <VStack alignItems="flex-start" spacing={1}>
              {menuItems.map(({ label, href }) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))}
            </VStack>
          </Box>
        </Flex>
        {/* <Flex
          alignItems="center"
          justifyContent="center"
          width={['100%', '100%', '50%']}
          flexWrap="wrap"
        >
          {logoSrc && <Image src={logoSrc} height={60} width={180} />}
        </Flex> */}
      </Contained>
      <Box
        flex={1}
        backgroundColor="gray.300"
        borderTopWidth={1}
        borderTopStyle="solid"
      >
        <Contained py={4} display="flex" justifyContent="space-between">
          <HStack alignItems="center" spacing={2}>
            <FontAwesomeIcon icon={faCopyright} />
            <Text>{new Date().getFullYear()}</Text>
            <Text>{SITE_NAME}</Text>
          </HStack>
          {/* <TranslatedLink href="/privacy-policy" passHref>
            <Link>Politika privatnosti</Link>
          </TranslatedLink> */}
        </Contained>
      </Box>
    </Box>
  )
}
