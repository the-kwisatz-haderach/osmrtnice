import { Flex } from '@chakra-ui/react'
import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import { Footer } from '../../components/Footer'
import { MainNavigation } from '../../components/MainNavigation'
import useAppContext from '../../contexts/AppContext'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

let shouldRender = process.env.NODE_ENV !== 'production'
const correct_pass = process.env.NEXT_PUBLIC_PROD_PASS

export default function MainLayout({
  children,
}: PropsWithChildren<any>): ReactElement {
  const { menuItems, ...contactDetails } = useAppContext()
  const { observe, getValues } = useIntersectionObserver<HTMLDivElement>()
  const { isIntersecting } = getValues('main')

  useEffect(() => {
    const checkPassword = () => {
      const password = window.prompt('Password')
      if (password === correct_pass) {
        shouldRender = true
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
      <MainNavigation menuItems={menuItems} alternate={isIntersecting} />
      <div
        id="main"
        ref={observe}
        style={{
          width: '100%',
          height: '50vh',
          position: 'absolute',
          pointerEvents: 'none',
          left: 0,
          top: 0,
        }}
      />
      <main>{children}</main>
      <Footer {...contactDetails} menuItems={menuItems} />
    </Flex>
  )
}
