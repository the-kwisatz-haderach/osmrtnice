import { Obituary } from '../../../domain/obituary/types'

const obituaryIdGenerator = (obituary: Obituary): string =>
  [obituary.firstname, obituary.middlename, obituary.surname, obituary.relative]
    .flatMap((val) => [...val].map((char) => char.charCodeAt(0)))
    .join('')
    .substr(0, 20)

export default obituaryIdGenerator
