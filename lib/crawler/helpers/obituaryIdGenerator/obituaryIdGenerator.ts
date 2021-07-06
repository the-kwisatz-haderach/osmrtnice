import { IObituary } from '../../../domain/types'

const obituaryIdGenerator = (
  obituary: Pick<IObituary, 'firstname' | 'middlename' | 'surname' | 'relative'>
): string =>
  [obituary.firstname, obituary.middlename, obituary.surname, obituary.relative]
    .flatMap((val) => [...val].map((char) => char.charCodeAt(0)))
    .join('')
    .substr(0, 20)

export default obituaryIdGenerator
