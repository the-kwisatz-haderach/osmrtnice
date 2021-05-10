import React, { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import cx from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { MenuItem } from '../../lib/types'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import styles from './MainNavigation.module.css'

interface Props {
  menuItems: MenuItem[]
  alternate?: boolean
}

export default function MainNavigation({
  menuItems,
  alternate = true,
}: Props): ReactElement {
  const [homeLink, ...links] = menuItems
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useOutsideClick<HTMLDivElement>(() => {
    setIsOpen(false)
  })

  useEffect(() => {
    setIsOpen(false)
  }, [router.pathname])

  const toggleMenu = (): void => {
    setIsOpen((curr) => !curr)
  }

  return (
    <>
      {isOpen && (
        <div className="h-screen md:hidden z-10 bg-black opacity-50 fixed inset-0" />
      )}
      <div
        ref={ref}
        className={cx(styles.container, { [styles.alternate]: alternate })}
      >
        <nav className="flex flex-wrap justify-between contained z-20 relative">
          <div className="w-1/3 py-5 px-10">
            <div className="hidden md:block">
              <Link href={homeLink.href}>{homeLink.label}</Link>
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
          <ul
            className={cx(styles.foldOutMenu, { [styles.hideMenu]: !isOpen })}
          >
            <div className="md:hidden">
              <Link href={homeLink.href}>{homeLink.label}</Link>
            </div>
            {links.map((menuItem, i) => (
              <li key={i}>
                <Link href={menuItem.href}>{menuItem.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
