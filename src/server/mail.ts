'use server'
import nodemailer from 'nodemailer'

export async function sendMail(formData: FormData) {
  const nameForm = formData.get('name') as string
  const email = formData.get('email') as string
  const subjectForm = formData.get('subject') as string
  const message = formData.get('message') as string
  const { EMAIL, EMAIL_PASSWORD } = process.env
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h1 style="color: #4CAF50;">Support</h1>
    <p>Hi <strong>${nameForm}</strong>,</p>
    <p>Thank you for reaching out to us. Here is the summary of your request:</p>
    <ul>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Subject:</strong> ${subjectForm}</li>
      <li><strong>Message:</strong> ${message}</li>
    </ul>
    <p>We will get back to you as soon as possible.</p>
    <p style="color: #888;">Best regards,<br>Support Team</p>
  </div>
`

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
    // Send the email
    const sendResult = await transport.sendMail({
      from: EMAIL,
      to: email,
      subject: subjectForm,
      html: htmlContent,
      // text: `Support ticket has been made by ${nameForm} his email address is: ${email} User content: ${message}`,
    })
    if (sendResult)
      return {
        success: true,
        message:
          'Success! Your email is sent to our email. We will try to respond as fast as possible',
      }
    else {
      return {
        success: false,
        message: 'Error. Something is not quite right try again',
      }
    }
  } catch (error) {
    console.log(error)
  }
}
