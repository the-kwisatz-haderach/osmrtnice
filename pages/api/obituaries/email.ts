import { sendEmail } from '../../../lib/email'

import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

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

const translations: Record<keyof Input, string> = {
  firstname: 'Ime',
  mail: 'Email',
  lastname: 'Prezime',
  phone: 'Telefon',
  message: 'Poruka',
  type: 'Tip',
  symbol: 'Simbol',
  photo: 'Fotografija',
}

const formatMessage = (fields: Input): string => {
  return Object.entries(fields).reduce<string>(
    (acc, [key, value]) =>
      acc +
      `<b>${translations[key as keyof typeof translations] || ''}:</b> ${
        value as string
      }<br />`,
    ''
  )
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
    })
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      return resolve({ fields, files })
    })
  })

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

        await sendEmail({
          subject: 'Primljena poruka od preminuli.ba',
          html: formatMessage(JSON.parse(parsed.fields.input[0])),
          attachments: files.map((file) => ({
            filename: file.originalFilename || file.newFilename,
            path: file.filepath,
          })),
        })

        return res.status(200).send('Success!')
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
