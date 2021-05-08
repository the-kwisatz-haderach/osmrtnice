import React, { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import cx from 'classnames'
import { MenuItem } from '../../lib/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styles from './MainNavigation.module.css'
import { useOutsideClick } from '../../hooks/useOutsideClick'

interface Props {
  menuItems: MenuItem[]
  alternate?: boolean
}

export default function MainNavigation({
  menuItems,
  alternate = true,
}: Props): ReactElement {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false))

  useEffect(() => {
    setIsOpen(false)
  }, [router.pathname])

  const toggleMenu = () => setIsOpen((curr) => !curr)

  return (
    <div
      ref={ref}
      className={cx(styles.container, { [styles.alternate]: alternate })}
    >
      <nav className="flex flex-wrap justify-between contained">
        <div className="w-1/3 p-5">
          <div className="hidden md:block">
            <Link href="/">Home</Link>
          </div>
          <div className="md:hidden">
            <FontAwesomeIcon onClick={toggleMenu} icon={faBars} size="lg" />
          </div>
        </div>
        <div className="w-1/3 flex justify-center">
          <Link href="/">
            <div className="cursor-pointer relative w-full">
              <Image src="/icons/logo.svg" alt="logo" layout="fill" />
            </div>
          </Link>
        </div>
        <ul className={cx(styles.foldOutMenu, { [styles.hideMenu]: !isOpen })}>
          <div className="md:hidden">
            <Link href="/">Home</Link>
          </div>
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
