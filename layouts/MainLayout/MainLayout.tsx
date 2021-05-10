import { useRouter } from 'next/router'
import React, { PropsWithChildren, ReactElement } from 'react'
import { Footer } from '../../components/Footer'
import { MainNavigation } from '../../components/MainNavigation'
import useAppContext from '../../contexts/AppContext'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

export default function MainLayout({
  children,
}: PropsWithChildren<any>): ReactElement {
  const { menuItems } = useAppContext()
  const { getValues } = useIntersectionObserver()
  const router = useRouter()

  const useAlternateMenu =
    router.pathname === '/' && getValues('image').isIntersecting

  return (
    <div
      className="flex flex-col"
      style={{
        height: '100vh',
      }}
    >
      <MainNavigation menuItems={menuItems} alternate={useAlternateMenu} />
      <main style={{ marginTop: 65 }}>{children}</main>
      <Footer menuItems={menuItems} className="flex-grow" />
    </div>
  )
}
