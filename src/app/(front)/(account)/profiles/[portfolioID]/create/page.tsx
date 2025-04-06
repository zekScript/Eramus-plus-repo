'use client'

import { createPost } from '@/server/post'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import SidebarForPosts from '@/components/sidebar-for-posts'

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
  const userId: number = parseInt(segments[2], 10)

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
    <div className='h-full w-full'>
      {/* NOT FINISHED */}
      {/* TODO: add a sidebar where u can edit text in real time like word */}
      {/* TODO: add a window where a user can enter text in markdown and color it in markdown */}
      {/* TODO: and in real time always check how is the output */}
      <div className='flex'>
        {/* Sidebar */}
        <div className='w-[30%]'>
          <SidebarForPosts />
        </div>
        <div className='h-full w-full bg-neutral-900'>
          <div>
            <h1 className='w-[20%] bg-background text-center text-2xl text-foreground'>
              Input
            </h1>
          </div>

          <div className='h-full w-full'>
            {/* Title input */}
            <form action={handleSubmit} className='mt-4'>
              <input type='hidden' name='userID' value={userId}></input>
              <input
                name='title'
                type='text'
                className='h-[35px] w-full bg-background text-xl'
                placeholder='Title'
              />

              <div>
                <textarea
                  name='content'
                  className='h-screen w-full bg-background'
                  placeholder='Write your blog here ex. trump is great in my opinion because...'
                ></textarea>
              </div>
              <button
                type='submit'
                className='mt-4 w-full rounded bg-blue-600 p-2 text-white'
              >
                Send data
              </button>
            </form>
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
        </div>

        {/* Input window */}
        <div className='h-full w-full border-l-2'>
          <div className='bg-neutral-900'>
            <h1 className='w-[20%] bg-background text-center text-2xl text-foreground'>
              Output
            </h1>
          </div>

          <div className='m-0 h-full w-full'>
            {/* Title input */}

            <div className='h-screen w-full border-r-2'>
              {/* Output window */}
              <div className='flex h-full w-full items-center justify-center text-4xl text-muted'>
                <h1>This is the final output of your blog</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Output window */}
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
