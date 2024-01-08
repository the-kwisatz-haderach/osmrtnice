import React, { ReactElement } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { IMenuItem } from '../../lib/storyblok/types'
import {
  Box,
  Button,
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
import { Contained } from 'components/Contained/Contained'

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
        mt={-1}
        pt={1}
        width="100%"
        backgroundColor="white"
        borderBottomStyle="solid"
        borderBottomWidth={2}
        borderBottomColor="gray.100"
        height={{ base: '55px', md: '70px' }}
      >
        <Contained
          py={0}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
        >
          <TranslatedLink href={homeLink.href} passHref>
            {logoSrc && (
              <Image
                title={homeLink.label}
                src={logoSrc}
                alt="logo"
                style={{
                  cursor: 'pointer',
                  width: 100,
                  height: 30,
                }}
                width={100}
                height={30}
              />
            )}
          </TranslatedLink>
          <HStack
            alignItems="center"
            pos="relative"
            top="2px"
            h="100%"
            spacing={{ base: 6, lg: 10 }}
            display={{ base: 'none', md: 'flex' }}
          >
            {links.map((menuItem) => (
              <TranslatedLink key={menuItem.href} passHref href={menuItem.href}>
                <Button
                  variant={menuItem.href === '/contact' ? 'solid' : 'link'}
                  colorScheme="brand"
                >
                  {menuItem.label}
                </Button>
              </TranslatedLink>
            ))}
          </HStack>
          <IconButton
            colorScheme="brand"
            icon={<FontAwesomeIcon size="lg" icon={faBars} />}
            display={{ md: 'none' }}
            onClick={onOpen}
            aria-label="main menu"
          />
        </Contained>
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
                      // isFullWidth
                      py={2}
                      variant={menuItem.href === '/contact' ? 'solid' : 'link'}
                      colorScheme="brand"
                    >
                      {menuItem.label}
                    </Button>
                  </TranslatedLink>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="brand" variant="outline" onClick={onClose}>
              {t('close')}
            </Button>
          </DrawerFooter>
          <DrawerCloseButton />
        </DrawerContent>
      </Drawer>
    </>
  )
}
