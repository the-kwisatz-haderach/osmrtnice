import { Flex } from '@chakra-ui/react'
import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from 'react'
import { Footer } from '../../components/Footer'
import { MainNavigation } from '../../components/MainNavigation'
import useAppContext from '../../contexts/AppContext'

const correct_pass = process.env.NEXT_PUBLIC_PROD_PASS

export default function MainLayout({
  children,
}: PropsWithChildren<any>): ReactElement {
  const { menuItems, logo, ...contactDetails } = useAppContext()
  const [shouldRender, setShouldRender] = useState(
    process.env.NODE_ENV !== 'production'
  )

  useEffect(() => {
    const checkPassword = () => {
      const password =
        window.sessionStorage.getItem('pass') || window.prompt('Password')
      if (password === correct_pass) {
        window.sessionStorage.setItem('pass', correct_pass)
        setShouldRender(true)
      } else {
        checkPassword()
      }
    }

    if (!shouldRender) {
      checkPassword()
    }
  }, [])

  if (!shouldRender) {
    return <></>
  }

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
