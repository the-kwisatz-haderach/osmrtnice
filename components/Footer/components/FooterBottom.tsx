import { ReactElement } from 'react'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const FooterBottom = (): ReactElement => (
  <div className="contained p-5  flex flex-col sm:flex-row justify-between">
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
