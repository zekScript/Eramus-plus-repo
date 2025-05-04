'use client'
import { Button } from '@/components/ui/button'
import { sendMail } from '@/server/mail'
import { getCurrentUser } from '@/server/currentUser'
import { Label } from '@radix-ui/react-dropdown-menu'
import { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'

export default function Support() {
  const { toast } = useToast()
  const [feedback, setFeedback] = useState({ success: false, message: '' })

  const user = getCurrentUser()

  const send = async (formData: FormData) => {
    const result = await sendMail(formData)
    if (result) {
      setFeedback(result)
    }
  }

  useEffect(() => {
    if (feedback.message) {
      toast({
        title: feedback.success ? 'Success' : 'Err...',
        description: feedback.message,
      })
    }
  }, [feedback, toast])

  return (
    <div>
      {/* Title page */}
      <div className='h-full w-full bg-gray-500 text-center'>
        <h1 className='p-7 text-3xl'>Contact us</h1>
      </div>
      <div className='flex h-full w-full flex-col'>
        <form className='contactContainer w-full space-y-5 text-xl mt-6'>
          {/* In the input should be from the db current user his name and mail inside the input */}
          <Label>Your Name</Label>
          <input
            type='text'
            placeholder='Your Name'
            value={user?.name}
            name='name'
          />
          <Label>Your Email address</Label>
          <input
            type='text'
            placeholder='Your Email address'
            value={user?.email}
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
          </div>
        </form>
      </div>
    </div>
  )
}
