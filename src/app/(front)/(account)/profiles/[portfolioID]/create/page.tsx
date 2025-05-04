'use client'

import { createPost } from '@/server/post'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { useMDXComponentsPost } from '../../../../../../../mdx-components-post'
import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

export default function CreatePost() {
  
  const { toast } = useToast()
  const pathname = usePathname()
  const segments = pathname.split('/')
  const userId: number = parseInt(segments[2], 10)
  const MDXcomponents = useMDXComponentsPost({})

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [feedback, setFeedback] = useState({ success: false, message: '' })

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await createPost(formData)
      if (result) {
        setFeedback(result)
      }
    } catch (err) {
      console.error(err)
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
    <div className='h-full w-full'>
      <div className='md:flex'>
        {/* Sidebar */}
        {/* <div className='w-[15%]'>
          <SidebarForPosts />
        </div> */}

        {/* Editor */}
        <div className='w-full light:bg-neutral-900 p-4 md:w-[50%]'>
          <form action={handleSubmit} className='space-y-4'>
            <input type='hidden' name='userID' value={userId} />

            <h1 className='text-2xl font-semibold '>
              Write Your Post
            </h1>

            <input
              name='title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}

className={cn(
                'w-full rounded bg-background p-3 text-xl border-b-2 border-theme shadow-sm transition focus:outline-none',
                'border-gray-300 focus:border-theme focus:ring-2 focus:ring-transparent',
                'bg-transparent',
              )}

              
              placeholder='Title'
            />

            <textarea
              name='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={cn(
                'resize-none p-3 border-theme h-[400px] w-full rounded bg-background border-b-2 border-theme shadow-sm transition focus:outline-none',
                'border-gray-300 focus:border-theme focus:ring-2 focus:ring-transparent',
                'bg-transparent'
              )}
              placeholder='Supports markdown, check documentation below for more details'
            ></textarea>
            <div className='flex justify-between'>
              <button
                type='submit'
                className='rounded bg-indigo-500 px-2 py-2 text-white bg-theme'
              >
                Post your blog
              </button>
              <Link href='#'>Markdown documentation</Link>
            </div>
          </form>
        </div>

        {/* Output Preview */}
        <div className='h-full w-[50%] border-l-2 p-4'>
          <h1 className='text-2xl font-semibold'>Live Preview</h1>
          <h2 className='mt-4 text-xl font-bold'>{title}</h2>
          <div className='prose prose-invert max-w-none text-white'>
            <ReactMarkdown components={MDXcomponents}>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
