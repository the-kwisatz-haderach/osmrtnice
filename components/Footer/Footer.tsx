import React, { ReactElement } from 'react'
import Image from 'next/image'
import cx from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { InfoList } from '../InfoList'
import useAppContext from '../../contexts/AppContext'

const FooterBottom = (): ReactElement => (
  <div className="p-5 border-primary-200 border-t-2 flex flex-col sm:flex-row justify-between">
    <div className="flex space-x-5">
      <span className="space-x-2 flex items-center">
        <FontAwesomeIcon icon={faCopyright} />
        <p>Copyright</p>
      </span>
      <p>Privacy policy</p>
    </div>
    <ul className="flex space-x-5">
      <li>Facebook</li>
      <li>LinkedIn</li>
    </ul>
  </div>
)

export default function Footer(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
): ReactElement {
  const { menuItems } = useAppContext()
  return (
    <footer {...props} className={cx('bg-primary-100', props.className)}>
      <div className="flex justify-between flex-wrap">
        <div className="w-full lg:w-3/5 flex-wrap flex px-10 pt-10">
          <div className="flex flex-col mr-20 mb-10">
            <h3 className="mb-2">Contact details</h3>
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
            <h3 className="mb-2">Sitemap</h3>
            <InfoList
              items={[{ label: 'Home', href: '/' }, ...menuItems].map(
                (menuItem) => ({
                  content: menuItem.label,
                  href: menuItem.href,
                })
              )}
            />
          </div>
          <div className="flex flex-col mb-10">
            <h3 className="mb-2">Get in touch</h3>
          </div>
        </div>
        <div className="flex flex-grow justify-center items-center">
          <Image src="/icons/logo.svg" height={200} width={300} />
        </div>
      </div>
      <FooterBottom />
    </footer>
  )
}
