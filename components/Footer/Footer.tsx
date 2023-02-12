import React, { ReactElement, DetailedHTMLProps } from 'react'
import Image from 'next/image'
import { InfoList } from '../InfoList'
import { FooterBottom } from './components/FooterBottom'
import { IMenuItem } from '../../lib/storyblok/types'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import {
  faPhone as phoneIcon,
  faMailBulk as mailIcon,
  faLocationArrow as locationIcon,
} from '@fortawesome/free-solid-svg-icons'

interface Props
  extends DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  menuItems: IMenuItem[]
  address: string
  phone: string
  email: string
  logoSrc: string
}

export default function Footer({
  menuItems,
  address,
  phone,
  email,
  logoSrc,
}: Props): ReactElement {
  const { t } = useTranslation()
  return (
    <Box
      flex={1}
      as="footer"
      backgroundColor="gray.200"
      borderTopWidth={2}
      borderTopStyle="solid"
      borderTopColor="gray.300"
    >
      <Flex
        margin="auto"
        maxW="container.xl"
        justifyContent="space-between"
        flexWrap="wrap"
        pb={10}
        px={5}
        pt={10}
      >
        <Flex width={['100%', '100%', '50%']} flexWrap="wrap">
          <Box mr={[8, 8, 16]} mb={8}>
            <Heading as="h3" size="xl" mb={4}>
              {t('contact-details')}
            </Heading>
            <InfoList
              items={[
                {
                  label: t('address'),
                  content: address,
                  icon: locationIcon,
                },
                { label: t('phone'), content: phone, icon: phoneIcon },
                {
                  label: t('mail'),
                  content: email,
                  href: `mailto:${email}`,
                  icon: mailIcon,
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
                content: menuItem.label,
                href: menuItem.href,
              }))}
            />
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          width={['100%', '100%', '50%']}
          flexWrap="wrap"
        >
          {logoSrc && <Image src={logoSrc} height={200} width={300} />}
        </Flex>
      </Flex>
      <Box
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
