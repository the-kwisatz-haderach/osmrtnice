import React, { ReactElement } from 'react'
import Link from 'next/link'
import { MenuItem } from '../../lib/types'

interface Props {
  menuItems: MenuItem[]
}

export default function MainNavigation({ menuItems }: Props): ReactElement {
  return (
    <nav className="flex justify-between p-5">
      <div>
        <Link href="/">ICON</Link>
      </div>
      <div>
        {menuItems.map((menuItem) => (
          <Link href={menuItem.href}>{menuItem.label}</Link>
        ))}
      </div>
    </nav>
  )
}
