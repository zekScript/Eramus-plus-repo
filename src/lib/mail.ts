'use server'
import nodemailer from 'nodemailer'

export async function sendMail(formData: FormData) {
  const nameForm = formData.get('name') as string
  const email = formData.get('email') as string
  const subjectForm = formData.get('subject') as string
  const message = formData.get('message') as string
  const { EMAIL, EMAIL_PASSWORD } = process.env

  if (!nameForm || !email || !subjectForm || !message)
    return { success: false, message: 'All fields should not be empty' }

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  })

  try {
    const testResult = await transport.verify()
    console.log(testResult)
  } catch (error) {
    console.error({ error })
    return
  }

  try {
    // Send the email
    const sendResult = await transport.sendMail({
      from: EMAIL,
      to: EMAIL,
      subject: subjectForm,
      html: `Support ticket has been made by ${nameForm} <br/> his email address is: ${email} <br/>`,
      // text: message,
    })
    if (sendResult)
      return {
        success: true,
        message:
          'Success! Your email is sent to our server. We will try to respond as fast as possible',
      }
  } catch (error) {
    console.log(error)
  }
}

// export function compileWelcomeTemplate(name: string, url: string) {
//   const template = handlebars.compile(welcomeTemplate);
//   const htmlBody = template({
//     name: name,
//     url: url,
//   });
//   return htmlBody;
// }
