import React, { ReactElement } from 'react'
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
  HStack,
  IconButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { TranslatedLink } from '../TranslatedLink'
import { useTranslation } from 'next-i18next'

interface Props {
  menuItems?: IMenuItem[]
  logoSrc?: string
}

export default function MainNavigation({
  menuItems = [],
  logoSrc = '',
}: Props): ReactElement {
  const { t } = useTranslation()
  const [homeLink, ...links] = menuItems
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box
        as="nav"
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
          height="100%"
          px={4}
        >
          <TranslatedLink href={homeLink.href} passHref>
            <Box
              title={homeLink.label}
              as="a"
              position="relative"
              width="100px"
              height="30px"
            >
              {logoSrc && <Image src={logoSrc} alt="logo" layout="fill" />}
            </Box>
          </TranslatedLink>
          <HStack
            alignItems="center"
            pos="relative"
            top="2px"
            h="100%"
            spacing={10}
            display={{ base: 'none', md: 'flex' }}
          >
            {links.map((menuItem) => (
              <TranslatedLink key={menuItem.href} passHref href={menuItem.href}>
                <Button
                  variant={menuItem.href === '/contact' ? 'solid' : 'link'}
                  colorScheme="orange"
                >
                  {menuItem.label}
                </Button>
              </TranslatedLink>
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
          <DrawerHeader>{t('menu')}</DrawerHeader>
          <DrawerBody>
            <VStack as="nav" spacing={4} divider={<Divider />}>
              {menuItems.map((menuItem, i) => (
                <Box width="100%" textAlign="center" key={i} height="100%">
                  <TranslatedLink passHref href={menuItem.href}>
                    <Button
                      onClick={onClose}
                      isFullWidth
                      py={2}
                      variant={menuItem.href === '/contact' ? 'solid' : 'link'}
                      colorScheme="orange"
                    >
                      {menuItem.label}
                    </Button>
                  </TranslatedLink>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="orange" variant="outline" onClick={onClose}>
              {t('close')}
            </Button>
          </DrawerFooter>
          <DrawerCloseButton />
        </DrawerContent>
      </Drawer>
    </>
  )
}
