import { createTransport, SendMailOptions } from 'nodemailer'

const transporter = createTransport({
  port: Number.parseInt(process.env.EMAIL_PORT ?? '465'),
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
})

export async function sendEmail(
  options: Omit<SendMailOptions, 'from' | 'to'>
): Promise<{
  messageId: string
}> {
  return await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        ...options,
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_CREATE_OBITUARY_RECIPIENT,
      },
      (err, info) => {
        if (err) {
          reject(err)
        } else {
          resolve({ messageId: info.messageId })
        }
      }
    )
  })
}
