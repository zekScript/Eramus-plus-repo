'use client'
import { Button } from '@/components/ui/button'
import { sendMail } from '@/lib/mail'
import { getCurrentUser } from '@/server/currentUser'
import { Label } from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'

export default function Support() {
  const [feedback, setFeedback] = useState({ success: false, message: '' })

  const user = getCurrentUser()

  // Comunicate with back-end server
  const send = async (formData: FormData) => {
    const result = await sendMail(formData)
    if (result) {
      setFeedback(result)
    }
  }

  return (
    <div>
      {/* Title page */}
      <div className='h-full w-full bg-gray-500 text-center'>
        <h1 className='p-7 text-3xl'>Contact us</h1>
      </div>
      <div className='mt-7 flex h-full w-full flex-col'>
        <form className='contactContainer w-full text-xl'>
          {/* In the input should be from the db current user his name and mail inside the input */}
          <Label>Your Name</Label>
          <input
            type='text'
            placeholder='Your Name'
            defaultValue={user?.name}
            name='name'
          />
          <Label>Your Email address</Label>
          <input
            type='text'
            placeholder='Your Email address'
            defaultValue={user?.email}
            name='email'
          />
          <Label>Subject</Label>
          <input type='text' placeholder='Subject' name='subject' />
          <Label>Your Messege</Label>
          <textarea
            cols={40}
            rows={10}
            className='mt-3'
            placeholder='Your Message'
            name='message'
          />
          <br></br>
          <div className='flex'>
            <Button
              formAction={send}
              type='submit'
              variant='default'
              className='mt-7'
            >
              Send Message
            </Button>
            {feedback.message && (
              <div
                className={`ml-5 mt-4 w-full p-3 text-start ${
                  feedback.success ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {feedback.message}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
