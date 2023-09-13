import React, { ReactElement, DetailedHTMLProps } from 'react'
import Image from 'next/image'
import { InfoList } from '../InfoList'
import { FooterBottom } from './components/FooterBottom'
import { IMenuItem } from '../../lib/storyblok/types'
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import {
  faPhone as phoneIcon,
  faMailBulk as mailIcon,
  // faLocationArrow as locationIcon,
} from '@fortawesome/free-solid-svg-icons'

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
      borderTopWidth={2}
      borderTopStyle="solid"
      borderTopColor="gray.300"
    >
      <Container
        display="flex"
        mx="auto"
        maxW="container.xl"
        justifyContent="space-between"
        flexWrap="wrap"
        pb={10}
        px={5}
        pt={10}
      >
        <Flex width={['100%', '100%', '50%']} flexWrap="wrap">
          <Box mr={[0, 8, 8, 16]} mb={8}>
            <Heading as="h3" size="xl" mb={4}>
              {t('contact-details')}
            </Heading>
            <Text mb="2">{ingress}</Text>
            <InfoList
              items={[
                {
                  label: t('phone'),
                  content: phone,
                  icon: phoneIcon,
                  href: `tel:${phone.replace(/\s+/g, '')}`,
                  isMailto: true,
                },
                {
                  label: t('mail'),
                  content: email,
                  href: `mailto:${email}`,
                  icon: mailIcon,
                  isMailto: true,
                },
              ]}
            />
          </Box>
          <Box>
            <Heading as="h3" size="xl" mb={4}>
              {t('pages')}
            </Heading>
            <InfoList
              items={menuItems.map((menuItem) => ({
                content:
                  menuItem.href === '/thank-you'
                    ? t('thank-you-plural')
                    : menuItem.href === '/last-greetings'
                    ? t('last-greetings-plural')
                    : menuItem.label,
                href: menuItem.href,
              }))}
            />
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
      </Container>
      <Box
        flex={1}
        backgroundColor="gray.300"
        borderTopColor="gray.400"
        borderTopWidth={2}
        borderTopStyle="solid"
      >
        <FooterBottom />
      </Box>
    </Box>
  )
}
