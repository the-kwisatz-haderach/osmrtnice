import React, { PropsWithChildren, ReactElement } from 'react'
import { MainNavigation } from '../../components/MainNavigation'
import useAppContext from '../../contexts/AppContext'

interface Props {}

export default function MainLayout({
  children,
}: PropsWithChildren<Props>): ReactElement {
  const { menuItems } = useAppContext()
  return (
    <div>
      <MainNavigation menuItems={menuItems} />
      <main>{children}</main>
    </div>
  )
}
