'use client'

import { loginUser } from '../../../../server/user'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [feedback, setFeedback] = useState({ success: false, message: '' })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()



  const handleSubmit = async (formData: FormData) => {
    const result = await loginUser(formData)
    if(result.success){

      


      document.cookie = `authToken=${result.token}; path=/`; // Store token in a cookie
      router.push("/"); // Redirect to home page
    }else{
      setFeedback(result)
    }
  }



  
  return (
    <>
      <div className='flex h-screen w-full'>
        {/* Login Form Section */}
        <div className='flex h-screen w-1/2 flex-col items-center justify-center p-8'>
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
              className='w-full rounded-md bg-blue-500 p-3 text-white hover:bg-blue-600'
            >
              Log In
            </button>
          </form>

          {feedback.message && (
            <div
              className={`mt-4 w-full rounded-md p-3 text-center ${
                feedback.success
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {feedback.message}
            </div>
          )}

          <Link className='mt-5' href='/signin'>
            Don’t have an account? Sign Up
          </Link>
        </div>

        {/* Background Image Section */}
        <div className='login-image h-full w-1/2 bg-cover bg-center'>
          <Image
            src='/signinWallpaper.jpg'
            width={1500}
            height={1500}
            className='h-full'
            alt='Background Image to relax'
          />
        </div>
      </div>
    </>
  )
}
