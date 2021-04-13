import React, { ReactElement } from 'react'
import Link from 'next/link'
import { MenuItem } from '../../lib/types'

interface Props {
  menuItems: MenuItem[]
}

export default function MainNavigation({ menuItems }: Props): ReactElement {
  return (
    <nav className="flex justify-between p-5 contained border-b border-gray-200">
      <div>
        <Link href="/">ICON</Link>
      </div>
      <div className="space-x-5">
        {menuItems.map((menuItem, i) => (
          <Link key={i} href={menuItem.href}>
            {menuItem.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
