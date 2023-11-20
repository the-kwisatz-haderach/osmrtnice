import { obituarySymbols, obituaryTypes } from 'lib/domain'
import { ContactFormInput, ObituaryType } from 'lib/domain/types'

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

export const validateFields = (
  input: ContactFormInput
): Array<{ field: keyof ContactFormInput; error: string }> => {
  const errors: Array<{ field: keyof ContactFormInput; error: string }> = []
  if (
    input.symbol !== 'without_symbol' &&
    !obituarySymbols.some((symbol) => symbol.type === input.symbol)
  ) {
    errors.push({ field: 'symbol', error: 'invalid_symbol' })
  }
  if (
    input.symbol !== '' &&
    !obituaryTypes.includes(input.type as ObituaryType)
  ) {
    errors.push({ field: 'type', error: 'invalid_type' })
  }
  if (!emailRegex.test(input.mail)) {
    errors.push({ field: 'mail', error: 'invalid_mail' })
  }
  return errors
}
