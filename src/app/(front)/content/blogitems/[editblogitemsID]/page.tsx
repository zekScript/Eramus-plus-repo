'use client'
import { findPostById } from '@/server/post'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ProfileProps {
  params: { editblogitemsID: string }
}

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { TriangleAlert, X } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const EditPost: React.FC<ProfileProps> = ({ params }) => {
  const [deleteCard, setDeleteCard] = useState(false)
  const searchParams = useSearchParams()
  const postId = searchParams.get('p')

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

  if (loading) return <p>Loading...</p>
  if (!post) return <p>Post not found</p>

  return (
    <div className='m-auto h-full w-[50%] justify-center'>
      <h1 className='text-end'>Blog id: {post.id}</h1>
      <div className='mb-7 mt-7'>
        <div className='mt-12'>
          <label className='text-xs'>Blog title:</label>
          <input
            className={cn(
              'mt-1 w-full border-b-2 border-indigo-500 py-2 pl-1 text-sm shadow-sm transition focus:outline-none',
              'border-gray-300 focus:border-b-indigo-500 focus:ring-2 focus:ring-transparent',
              'bg-transparent'
            )}
            defaultValue={post.title}
          />
        </div>
        <div className='mb-7 mt-7'>
          <label className='text-xs'>Blog :</label>
          <textarea
            className={cn(
              'mt-1 w-full border-b-2 border-indigo-500 py-2 pl-1 text-sm shadow-sm transition focus:outline-none',
              'border-gray-300 focus:border-b-indigo-500 focus:ring-2 focus:ring-transparent',
              'bg-transparent',
              'h-96 resize-none'
            )}
            defaultValue={post.content}
          ></textarea>
        </div>

        <div className='mb-7 mt-7'>
          <label className='text-xs'>Blog content:</label>
          <textarea
            className={cn(
              'mt-1 w-full border-b-2 border-indigo-500 py-2 pl-1 text-sm shadow-sm transition focus:outline-none',
              'border-gray-300 focus:border-b-indigo-500 focus:ring-2 focus:ring-transparent',
              'bg-transparent',
              'h-96 resize-none'
            )}
            defaultValue={post.content}
          ></textarea>
        </div>

        <div className='mt-3 flex h-full w-full border-2 border-indigo-500 p-6'>
          <div className='flex h-full w-full flex-col'>
            <div className='flex h-full w-full'>
              <div className='flex h-full w-full flex-col'>
                <h1 className='text-md font-medium'>Change blog visibility</h1>
                <p className='text-sm'>This blog is currently public</p>
              </div>

              {/* Selection */}
              <div className='mr-3 flex items-center gap-4'>
                <Select>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Change visibility' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='public'>Public</SelectItem>
                      <SelectItem value='private'>Private</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {/* Chevron button */}
              </div>
            </div>

            <div className='mt-7 flex h-full w-full'>
              <div className='flex h-full w-full flex-col'>
                <h1 className='text-md font-medium'>Delete this blog</h1>
                <p className='text-sm'>
                  Delete this post, once you delete this post there is no going
                  back
                </p>
              </div>

              {/* Selection */}
              <div className='mr-3 flex items-center gap-4'>
                <Button onClick={() => setDeleteCard(true)}>
                  Delete this blog
                </Button>

                {deleteCard && (
                  <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full flex-col bg-black bg-opacity-50'>
                    
                    <div className='w-full h-full flex items-center justify-center flex-col'>

                    
                    <div className='flex flex-col items-center justify-center rounded-lg p-6 border-2 bg-[#111] shadow-2xl'>

                    <form>
                      
                      </form>
                        <h1 className='text-2xl'>Are you sure?</h1>
                      
                        <Separator></Separator>

                        <div className='border-2 border-orange-500 bg-orange-400 bg-opacity-35 h-[75px] p-4 flex m-7'>
                            <div className='flex items-center space-x-2'>
                            <TriangleAlert size={24}></TriangleAlert> <h1>Warning: You are about to delete this post</h1>

                            </div>


                            </div>
<div className='w-[70%]'>
<p>Deleting this post there will be going back nor recovering this post. this is the last warning</p>

</div>
<div className='flex space-x-2 mb-3 mt-5'>

                      <input type='checkbox'></input> 
                    <p >Yes, I am sure. I want to delete this blog</p>



                        
                        </div>

                      <div className='mr-2 ml-2 flex justify-center mt-4 w-full'>

                        
                        <button className='bg-[#1e1e1e] w-full text-base'>
                            Delete this post
                        </button>
                      </div>
                    </div>

                    </div>
                    
                  </div>
                )}
              </div>
              
            </div>
            
          </div>
          
        </div>
      </div>

      <div className='flex w-full justify-end'>
      <Button>Save</Button>

      </div>

    </div>
  )
}

// Exporting the function as default
export default EditPost
