import { identity } from 'lodash'
import { IObituary } from '../../../domain/types'

const obituaryIdGenerator = ({
  firstname,
  middlename,
  surname,
  relative,
}: Pick<
  IObituary,
  'firstname' | 'middlename' | 'surname' | 'relative'
>): string =>
  [firstname, middlename, surname, relative]
    .filter(identity)
    .flatMap((val) => [...val].map((char) => char.charCodeAt(0)))
    .join('')
    .substr(0, 20)

export default obituaryIdGenerator
