import { IObituary } from '../../../lib/domain/types'

export const formatName = ({
  prefix,
  firstname,
  surname,
  name_misc,
}: Pick<IObituary, 'firstname' | 'surname' | 'prefix' | 'name_misc'>) =>
  (prefix ? `${prefix} ` : '') +
  [firstname, surname].join(' ') +
  (name_misc ? ` - ${name_misc}` : '')
