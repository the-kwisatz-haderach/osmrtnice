import React, { PropsWithChildren, ReactElement } from 'react'
import { Footer } from '../../components/Footer'
import { MainNavigation } from '../../components/MainNavigation'
import useAppContext from '../../contexts/AppContext'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

interface Props {}

export default function MainLayout({
  children,
}: PropsWithChildren<Props>): ReactElement {
  const { menuItems } = useAppContext()
  const { getValues } = useIntersectionObserver()
  const { isIntersecting } = getValues('image')
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation menuItems={menuItems} alternate={isIntersecting} />
      <main>{children}</main>
      <Footer className="flex-grow" />
    </div>
  )
}
