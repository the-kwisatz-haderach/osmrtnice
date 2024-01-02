import { Flex } from '@chakra-ui/react'
import React, { ReactElement, ReactNode } from 'react'
import { Footer } from '../../components/Footer'
import { MainNavigation } from '../../components/MainNavigation'
import useAppContext from '../../contexts/AppContext'

export default function MainLayout({
  children,
}: {
  children: ReactNode
}): ReactElement {
  const { menuItems, logo, ...contactDetails } = useAppContext()
  return (
    <Flex flexDir="column" minH="100vh">
      <MainNavigation menuItems={menuItems} logoSrc={logo?.filename} />
      <main>{children}</main>
      <Footer
        {...contactDetails}
        menuItems={menuItems}
        logoSrc={logo?.filename}
      />
    </Flex>
  )
}
