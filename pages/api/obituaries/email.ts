import { sendEmail } from '../../../lib/email'

import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

import translations from '../../../public/locales/hr/common.json'
import { obituarySymbols, obituaryTypes } from 'lib/domain'
import { ObituaryType } from 'lib/domain/types'

type TranslationsKey = keyof typeof translations

interface Input {
  firstname: string
  lastname: string
  phone: string
  mail: string
  message: string
  type: string
  symbol: string
  photo: File
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const formatMessage = (fields: Input): string => {
  return Object.entries(fields).reduce<string>((acc, [key, value]) => {
    const keyTranslation = translations[key as TranslationsKey] || ''
    const valueTranslation =
      translations[value as TranslationsKey] || (value as string)
    return acc + `<b>${keyTranslation}:</b> ${valueTranslation}<br />`
  }, '')
}

const parseFiles = (
  req: NextApiRequest
): Promise<{
  fields: formidable.Fields
  files: formidable.Files
}> =>
  new Promise((resolve, reject) => {
    const form = formidable({
      multiples: true,
      maxFiles: 5,
      allowEmptyFiles: false,
      maxTotalFileSize: 250 * 1024 * 1024,
    })
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      return resolve({ fields, files })
    })
  })

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

const validateFields = (
  input: Input
): Array<{ field: keyof Input; error: string }> => {
  const errors: Array<{ field: keyof Input; error: string }> = []
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      try {
        const parsed = await parseFiles(req)
        const files = (Array.isArray(parsed.files.files)
          ? parsed.files.files
          : [parsed.files.files]
        ).filter(Boolean)

        const parsedFields: Input = JSON.parse(parsed.fields.input[0])

        const validatedFields = validateFields(parsedFields)
        if (validateFields.length > 0) {
          return res.status(400).json({
            message: 'form submission failed',
            errors: validatedFields,
          })
        }

        await Promise.all([
          sendEmail({
            subject: translations.email_subject_contact_form_admin,
            html: formatMessage(parsedFields),
            attachments: files.map((file) => ({
              filename: file.originalFilename || file.newFilename,
              path: file.filepath,
            })),
          }),
          sendEmail({
            to: parsedFields.mail,
            subject: translations.email_subject_contact_form_confirmation,
            text: 'Confirmation', // TODO!
          }),
        ])

        return res.status(200).json({ message: 'form successfully submitted' })
      } catch (err) {
        console.error(err)
        let message = ''
        if (err instanceof Error) {
          message = err.message
        }
        return res.status(500).send(message)
      }
    }
    default: {
      return res.status(404).end()
    }
  }
}
