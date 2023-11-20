import formidable from 'formidable'
import { NextApiRequest } from 'next'

export const parseFiles = (
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
      filter: ({ mimetype }) => /image|pdf/.test(mimetype),
    })
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      return resolve({ fields, files })
    })
  })
