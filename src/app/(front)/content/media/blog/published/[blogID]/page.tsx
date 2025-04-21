'use client'

import { findPostById } from '@/server/post'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import ReactMarkdown from 'react-markdown'
import { PostItems } from '@/types'

const BlogPage = () => {
  // Accessing the search parameters correctly
  const searchParams = useSearchParams()
  const postId = searchParams.get('p') // Correctly accessing the 'p' parameter

  const [post, setPost] = useState<PostItems | null>(null)
  useEffect(() => {
    if (!postId) return

    const fetchPost = async () => {
      try {
        const post = await findPostById(postId)
        setPost(post)
      } catch (error) {
        console.error('Error fetching post:', error)
      } 
    }

    fetchPost()
  }, [postId])

  if (!post) return <p>Post not found</p>

  return (
    <>
      {/* Blog post content */}
      <div className='flex h-full w-full'>
        <div className='mr-3 w-full'>
          <h2 className='mt-4 text-xl font-bold'>{post.title}</h2>

          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Make a sidebar menu for the details of the blog */}
      </div>
    </>
  )
}

export default BlogPage
