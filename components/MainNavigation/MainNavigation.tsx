import React, { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cx from 'classnames'
import { MenuItem } from '../../lib/types'
import styles from './MainNavigation.module.css'

interface Props {
  menuItems: MenuItem[]
  alternate?: boolean
}

export default function MainNavigation({
  menuItems,
  alternate = true,
}: Props): ReactElement {
  return (
    <div className={cx(styles.container, { [styles.alternate]: alternate })}>
      <nav className="flex justify-between contained">
        <div className="w-1/3 py-5 px-10">
          <Link href="/">Home</Link>
        </div>
        <div className="w-1/3 flex items-center justify-center relative">
          <Link href="/">
            <div>
              <Image
                className="cursor-pointer"
                src="/icons/logo.svg"
                alt="logo"
                layout="fill"
              />
            </div>
          </Link>
        </div>
        <ul className="w-1/3 space-x-10 py-5 px-10 flex justify-end">
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
