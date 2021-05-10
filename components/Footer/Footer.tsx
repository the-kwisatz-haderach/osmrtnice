import React, { ReactElement } from 'react'
import Image from 'next/image'
import cx from 'classnames'
import { InfoList } from '../InfoList'
import { FooterBottom } from './components/FooterBottom'
import { MenuItem } from '../../lib/types'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  menuItems: MenuItem[]
}

export default function Footer({ menuItems, ...props }: Props): ReactElement {
  return (
    <footer {...props} className={cx('bg-gray-100', props.className)}>
      <div className="flex justify-between flex-wrap pb-10 pt-5 contained">
        <div className="w-full lg:w-3/5 flex-wrap flex px-10 pt-10">
          <div className="flex flex-col mr-20 mb-10">
            <h3 className="mb-2 text-2xl">Contact details</h3>
            <InfoList
              items={[
                { label: 'Address', content: 'Vegagatan 30B' },
                { label: 'Phone', content: '+46732 000 444' },
                {
                  label: 'E-mail',
                  content: 'something@mail.com',
                  href: 'mailto:something@mail.com',
                },
              ]}
            />
          </div>
          <div className="flex flex-col mr-20 mb-10">
            <h3 className="mb-2 text-2xl">Sitemap</h3>
            <InfoList
              items={menuItems.map((menuItem) => ({
                content: menuItem.label,
                href: menuItem.href,
              }))}
            />
          </div>
          <div className="flex flex-col mb-10">
            <h3 className="mb-2 text-2xl">Get in touch</h3>
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
