import React, { ReactElement } from 'react'
import Image from 'next/image'
import cx from 'classnames'
import { InfoList } from '../InfoList'
import { FooterBottom } from './components/FooterBottom'
import { IMenuItem } from '../../lib/storyblok/types'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  menuItems: IMenuItem[]
  address: string
  phone: string
  email: string
}

export default function Footer({
  menuItems,
  address,
  phone,
  email,
  className,
}: Props): ReactElement {
  return (
    <footer className={cx('bg-gray-100 border-gray-200 border-t-2', className)}>
      <div className="flex justify-between flex-wrap pb-10 pt-5 contained">
        <div className="w-full lg:w-3/5 flex-wrap flex flex-col sm:flex-row px-10 pt-10">
          <div className="flex flex-col md:mr-20 mb-10">
            <h3 className="mb-2 text-2xl">Contact details</h3>
            <InfoList
              items={[
                { label: 'Address', content: address },
                { label: 'Phone', content: phone },
                {
                  label: 'E-mail',
                  content: email,
                  href: `mailto:${email}`,
                },
              ]}
            />
          </div>
          <div className="flex flex-col md:mr-20 mb-10">
            <h3 className="mb-2 text-2xl">Sitemap</h3>
            <InfoList
              items={menuItems.map((menuItem) => ({
                content: menuItem.label,
                href: menuItem.href,
              }))}
            />
          </div>
        </div>
        <div className="flex flex-grow justify-center items-center">
          <Image src="/icons/logo.svg" height={200} width={300} />
        </div>
      </div>
      <div className="border-gray-200 border-t-2">
        <FooterBottom />
      </div>
    </footer>
  )
}
