'use client'

import { loginUser } from '../../../../server/user'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'

export default function LoginPage() {
  const { toast } = useToast()
  const [feedback, setFeedback] = useState({ success: false, message: '' })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    const result = await loginUser(formData)
    if (result.success) {
      document.cookie = `authToken=${result.token}; { expires: 62, path: '/' }` // Store token in a cookie
      router.push('/') // Redirect to home page
    } else {
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
    <>
      <div className='flex h-screen w-full'>
        {/* Login Form Section */}
        <div className='flex h-[50vh] w-full flex-col items-center justify-center p-8'>
          <h1 className='mb-6 text-3xl font-bold'>Log In</h1>
          <form
            className='w-full max-w-sm'
            action={(formData) => handleSubmit(formData)}
          >
            <input
              type='email'
              placeholder='example@mail.com'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mb-4 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mb-4 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              type='submit'
              className='w-full rounded-md bg-indigo-500 p-3 text-white hover:bg-indigo-400'
            >
              Log In
            </button>
          </form>

           
          <div className='flex flex-col space-y-1 mt-2'>
          <Link  href='/signin'>
                      Don’t have an account? Sign Up
                    </Link>

                    <Link  href="/forgot-passwd">I don't remember my password</Link>
          </div>
          
        </div>

        
      </div>
    </>
  )
}
