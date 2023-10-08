import { IObituary } from './types'

export const isMultiObituary = ({
  image_second,
  firstname_second,
  surname_second,
  date_of_birth_second,
  date_of_death_second,
}: IObituary): boolean =>
  Boolean(
    (typeof image_second === 'string'
      ? image_second
      : image_second?.filename) &&
      firstname_second &&
      surname_second &&
      date_of_birth_second &&
      date_of_death_second
  )
