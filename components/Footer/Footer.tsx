import React, { ReactElement } from 'react'
import Image from 'next/image'
import { InfoList } from '../InfoList'
import { FooterBottom } from './components/FooterBottom'
import { IMenuItem } from '../../lib/storyblok/types'
import { Box, Flex, Heading } from '@chakra-ui/react'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  menuItems: IMenuItem[]
  address: string
  phone: string
  email: string
}

export default function Footer({
  menuItems,
  address,
  phone,
  email,
}: Props): ReactElement {
  return (
    <Box
      as="footer"
      backgroundColor="gray.200"
      mt={24}
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
          <Box mr={16}>
            <Heading as="h3" size="xl" mb={2}>
              Contact details
            </Heading>
            <InfoList
              items={[
                { label: 'Address', content: address },
                { label: 'Phone', content: phone },
                {
                  label: 'E-mail',
                  content: email,
                  href: `mailto:${email}`,
                },
              ]}
            />
          </Box>
          <Box>
            <Heading as="h3" size="xl" mb={2}>
              Sitemap
            </Heading>
            <InfoList
              items={menuItems.map((menuItem) => ({
                content: menuItem.label,
                href: menuItem.href,
              }))}
            />
          </Box>
        </Flex>
        <Box
          width={['100%', '100%', '50%']}
          textAlign={['center', 'center', 'right']}
        >
          <Image src="/icons/logo.svg" height={200} width={300} />
        </Box>
      </Flex>
      <Box borderTopColor="gray.300" borderTopWidth={2} borderTopStyle="solid">
        <FooterBottom />
      </Box>
    </Box>
  )
}
