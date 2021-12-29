import React, { Fragment, ReactElement, useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { IMenuItem } from '../../lib/storyblok/types'
import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Link,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

interface Props {
  menuItems: IMenuItem[]
  alternate?: boolean
}

export default function MainNavigation({
  menuItems,
  alternate = true,
}: Props): ReactElement {
  const [homeLink, ...links] = menuItems
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    onClose()
  }, [router.pathname, onClose])

  return (
    <>
      <Box
        zIndex={100}
        boxShadow="lg"
        position="sticky"
        top={-1}
        width="100%"
        backgroundColor="white"
        borderBottomStyle="solid"
        borderBottomWidth={2}
        borderBottomColor="gray.100"
        height="70px"
      >
        <Container
          display="flex"
          maxW="container.xl"
          justifyContent="space-between"
          alignItems="center"
          px={4}
        >
          <NextLink href={homeLink.href} passHref>
            <Box
              title={homeLink.label}
              as="a"
              position="relative"
              width={120}
              height={70}
            >
              <Image src="/icons/logo.svg" alt="logo" layout="fill" />
            </Box>
          </NextLink>
          <HStack
            alignItems="center"
            spacing={10}
            display={{ base: 'none', md: 'flex' }}
          >
            {links.map((menuItem, i) => (
              <NextLink key={i} passHref href={menuItem.href}>
                <Button
                  variant={menuItem.href === '/contact' ? 'solid' : 'link'}
                  colorScheme="orange"
                >
                  {menuItem.label}
                </Button>
              </NextLink>
            ))}
          </HStack>
          <IconButton
            colorScheme="orange"
            icon={<FontAwesomeIcon size="lg" icon={faBars} />}
            display={{ md: 'none' }}
            onClick={onOpen}
            aria-label="main menu"
          />
        </Container>
      </Box>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Main menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} divider={<Divider />}>
              {menuItems.map((menuItem, i) => (
                <Box width="100%" textAlign="center" key={i} height="100%">
                  <NextLink passHref href={menuItem.href}>
                    <Button
                      isFullWidth
                      py={2}
                      variant={menuItem.href === '/contact' ? 'solid' : 'link'}
                      colorScheme="orange"
                    >
                      {menuItem.label}
                    </Button>
                  </NextLink>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="orange" variant="outline" onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
          <DrawerCloseButton />
        </DrawerContent>
      </Drawer>
    </>
  )
}
