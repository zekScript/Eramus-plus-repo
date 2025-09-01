'use client'
import { createUser } from '../../../../server/user'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Check, X } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { redirect } from 'next/navigation'

export default function AuthPage() {
  const { toast } = useToast()
  const [feedback, setFeedback] = useState({ success: false, message: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [validation, setValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  })

  const validatePassword = (value: string) => {
    setPassword(value)

    setValidation({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    })
  }

  const togglePasswordVisibility = (event: React.MouseEvent) => {
    event.preventDefault() // Prevent form submission
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (formData: FormData) => {
    const result = await createUser(formData)
    setFeedback(result)
  }

  useEffect(() => {
    if (feedback.message) {
      toast({
        title: feedback.success ? 'Success' : 'Err...',
        description: feedback.message,
      })
      redirect('/login')
    }
  }, [feedback, toast])

  return (
    <>
      <div className='flex h-screen w-full'>
        <div className='flex h-[50vh] w-full flex-col items-center justify-center p-8'>
          <h1 className='mb-6 text-3xl font-bold'>Sign Up</h1>
          <form
            className='w-full max-w-sm'
            action={(formData) => handleSubmit(formData)}
          >
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mb-4 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='email'
              placeholder='example@mail.com'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mb-4 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
                className='mb-2 w-full rounded-md border border-gray-300 p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button
                onClick={togglePasswordVisibility}
                className='absolute inset-y-0 bottom-2 right-4 text-gray-400'
                type='button' // Prevents form submission
              >
                {showPassword ? <EyeOff size={29} /> : <Eye size={29} />}
              </button>
            </div>
            <div className='mb-2 text-sm'>
              <p
                className={`flex text-sm ${validation.length ? 'text-green-500' : 'text-red-500'}`}
              >
                - At least 8 characters{' '}
                <span className='ml-2'>
                  {validation.length ? <Check /> : <X />}
                </span>
              </p>

              <p
                className={`flex text-sm ${validation.uppercase ? 'text-green-500' : 'text-red-500'}`}
              >
                - At least one uppercase letter{' '}
                <span className='ml-2'>
                  {validation.uppercase ? <Check /> : <X />}
                </span>
              </p>
              <p
                className={`flex text-sm ${validation.number ? 'text-green-500' : 'text-red-500'}`}
              >
                - At least one number{' '}
                <span className='ml-2'>
                  {validation.number ? <Check /> : <X />}
                </span>
              </p>
              <p
                className={`flex text-sm ${validation.specialChar ? 'text-green-500' : 'text-red-500'}`}
              >
                - At least one special character{' '}
                <span className='ml-2'>
                  {validation.specialChar ? <Check /> : <X />}
                </span>
              </p>
            </div>
            <button
              type='submit'
              className='w-full rounded-md bg-indigo-500 p-3 text-white hover:bg-indigo-400'
            >
              Sign Up
            </button>
          </form>

          <Link className='mt-5' href='/login'>
            Have an account already? Log in
          </Link>
        </div>
      </div>
    </>
  )
}
