import React, { PropsWithChildren, ReactElement } from 'react'
import { Footer } from '../../components/Footer'
import { MainNavigation } from '../../components/MainNavigation'
import useAppContext from '../../contexts/AppContext'

interface Props {}

export default function MainLayout({
  children,
}: PropsWithChildren<Props>): ReactElement {
  const { menuItems } = useAppContext()
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation menuItems={menuItems} />
      <main>{children}</main>
      <Footer className="flex-grow" />
    </div>
  )
}
