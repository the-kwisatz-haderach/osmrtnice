import React, { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MenuItem } from '../../lib/types'

interface Props {
  menuItems: MenuItem[]
  alternate?: boolean
}

export default function MainNavigation({
  menuItems,
  alternate = false,
}: Props): ReactElement {
  return (
    <div className="bg-white border-b border-gray-200 sticky inset-0 z-10">
      <nav className="flex justify-between contained">
        <div className="w-1/3 p-5">
          <Link href="/">Home</Link>
        </div>
        <div className="w-1/3 flex items-center justify-center relative">
          <Link href="/">
            <Image
              className="cursor-pointer"
              src="/icons/logo.svg"
              alt="logo"
              layout="fill"
            />
          </Link>
        </div>
        <ul className="w-1/3 space-x-5 p-5 flex justify-end">
          {menuItems.map((menuItem, i) => (
            <li key={i}>
              <Link href={menuItem.href}>{menuItem.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
