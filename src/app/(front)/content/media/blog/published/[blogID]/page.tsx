'use client'

import { findPostById } from '@/server/post'


import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import ReactMarkdown from 'react-markdown'


const BlogPage = () => {
  const [deleteCard, setDeleteCard] = useState(false)
  
  // Accessing the search parameters correctly
  const searchParams = useSearchParams()
  const postId = searchParams.get('p') // Correctly accessing the 'p' parameter

  const [post, setPost] = useState<{
    id: string
    title: string
    content: string
    slug: string
    badge: string | null
    createdAt: Date
    published: boolean
    likes: number
    dislikes: number
    views: number
    updatedAt: Date
    authorId: number
  } | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!postId) return

    const fetchPost = async () => {
      try {
        const post = await findPostById(postId)
        setPost(post)
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [postId])


  console.log(post);
  if (loading) return <p>Loading...</p>
  if (!post) return <p>Post not found</p>



  return(
    <>
                <ReactMarkdown>{post.content}</ReactMarkdown>
    
    </>
  )
}

export default BlogPage;
