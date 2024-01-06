import { sendEmail, parseFiles, validateFields } from '../../../lib/email'

import type { NextApiRequest, NextApiResponse } from 'next'

import translations from '../../../public/static/locales/hr/common.json'
import { ContactFormInput, TranslationsKey } from 'lib/domain/types'

export const config = {
  api: {
    bodyParser: false,
  },
}

const formatMessage = (fields: ContactFormInput): string => {
  return Object.entries(fields).reduce<string>((acc, [key, value]) => {
    const keyTranslation = translations[key as TranslationsKey] || ''
    const valueTranslation =
      translations[value as TranslationsKey] || (value as string)
    return acc + `<b>${keyTranslation}:</b> ${valueTranslation}<br />`
  }, '')
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

        const parsedFields: ContactFormInput = JSON.parse(
          parsed.fields.input[0]
        )

        const errors = validateFields(parsedFields)
        if (errors.length > 0) {
          return res.status(400).json({
            message: 'form submission failed',
            errors,
          })
        }

        const formattedFields = formatMessage(parsedFields)

        await Promise.all([
          sendEmail({
            subject: translations.email_subject_contact_form_admin,
            html: formattedFields,
            attachments: files.map((file) => ({
              filename: file.originalFilename || file.newFilename,
              path: file.filepath,
            })),
          }),
          sendEmail({
            to: parsedFields.mail,
            subject:
              translations.email_subject_contact_form_confirmation +
              ' ' +
              translations[parsedFields.type as TranslationsKey],
            html: `
              <h2>Hvala što koristite Preminuli.ba!</h2>
              <p>Ovaj e-mail je potvrda o primitku ispunjenog kontakt formulara.</p>
              <p>Informacije koje ste poslali:</p>
              ${formattedFields}
              <p>Ukoliko imate dodatnih pitanja, kontaktirajte nas direktno putem telefona ili e-maila. Dostupni smo na Viberu i WhatsAppu.</p>
              <p><b>Broj telefona</b></br>
              <a href="tel:+38763028457">+387 63 028 457</a></br>
              <a href="tel:+38762604705">+387 62 604 705</a></p>
              <p><b>E-mail</b></br>
              <a href="mailto:preminuli.ba@gmail.com">preminuli.ba@gmail.com</a></p>
            `,
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
