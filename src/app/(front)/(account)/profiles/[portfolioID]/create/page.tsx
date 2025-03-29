'use client'

import { createPost } from '@/server/post'
import { useEffect, useState } from 'react'
import { findUserById } from '@/server/user'
import { usePathname } from 'next/navigation'

interface UserProfile {
  name: string
  id: number
  password: string
  email: string
  accessAdmin: boolean | null
  createdAt: Date
  updatedAt: Date
  role: string
  followersCount: number
  followingCount: number
  postsCount: number
  profilePic: string | null
  bio: string | null
}
export default function CreatePost() {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const userId = parseInt(segments[2], 10)
  console.log(userId)

  const [feedback, setFeedback] = useState({ success: false, message: '' })

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await createPost(formData)
      if (result) {
        setFeedback(result)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className='bg-red-500 w-full h-full'>
        {/* TODO: Add a sidebar where u can esilly create or edit blog posts and save it as a snipet for later projects */}
        {/* TODO: add a window where a user can enter text in markdown and color it in markdown */}
        {/* TODO: and in real time always check how is the output */}

{/* Sidebar */}
<div>
<p>Hello world</p>
    <p>Hello world</p>
    <p>Hello world</p>
    <p>Hello world</p>
    <p>Hello world</p>
    <p>Hello world</p>
</div>

{/* Input window */}
<div>
  <div>
    {/* Juosta */}

  </div>
  <div>
    {/* Title input */}
  </div>
  <div>
    {/* Writing window */}
  </div>
</div>
    

    {/* Output window */}

    <div>
      
    </div>

    </div>
  )
}








// <div className='m-auto w-[90%] max-w-2xl p-6'>
//       <h1 className='text-2xl font-bold'>Create a New Blog Post</h1>
//       {error && <p className='text-red-500'>{error}</p>}
//       <form action={handleSubmit} className='mt-4'>
//         <input type='hidden' disabled name='userID' defaultValue={userId}></input>
//         <input
//           type='text'
//           name='title'
//           placeholder='Post Title'
//           className='mb-4 w-full rounded border p-2'
//           required
//         />
//         <textarea
//           name='content'
//           placeholder='Write your post in Markdown...'
//           className='h-40 w-full rounded border p-2'
//           required
//         />
//         <button
//           type='submit'
//           className='mt-4 w-full rounded bg-blue-600 p-2 text-white'
//         >
//           Send data
//         </button>
//         {feedback.message && (
//           <div
//             className={`ml-5 mt-4 w-full p-3 text-start ${
//               feedback.success ? 'text-green-700' : 'text-red-700'
//             }`}
//           >
//             {feedback.message}
//           </div>
//         )}
//       </form>
//     </div>
