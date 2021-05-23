import { ReactElement } from 'react'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '../../Link'

export const FooterBottom = (): ReactElement => (
  <div className="contained p-5  flex flex-col sm:flex-row justify-between">
    <div className="flex space-x-5">
      <span className="space-x-2 flex items-center">
        <FontAwesomeIcon icon={faCopyright} />
        <p>Osmrtnice</p>
      </span>
      <Link href="/privacy-policy">Privacy policy</Link>
    </div>
  </div>
)
