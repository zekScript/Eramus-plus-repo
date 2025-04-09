'use client'
import { deletePost, findPostById, updatePostTag, updatePostVisibillity } from '@/server/post'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ProfileProps {
  params: { editblogitemsID: string }
}

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Router, TriangleAlert, X } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

const EditPost: React.FC<ProfileProps> = ({ params }) => {
  
  const router = useRouter()
  const [deleteCard, setDeleteCard] = useState(false)
  const [confirmed, setConfirmed] = useState(false) // <-- checkbox state
  const searchParams = useSearchParams()
  const postId = searchParams.get('p')

  const [post, setPost] = useState<{
    id: string
    title: string
    content: string
    slug: string
    badge: string | null
    createdAt: Date
    postVisibillity: string
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

  const handleSelectChangeOnTag = async (value: string) => {
  await updatePostTag(post.id, value);

}

  const handleSelectChangeOnVisibillity = async (value: string) => {
    await updatePostVisibillity(post.id, value);
  }


  const handleSubmit = async () => {

    if(confirmed){
      await deletePost(post.id)
      router.push(`/profiles/${post.authorId}/all-posts`)
    }
    else{
      return null
    }
      
    }

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
          <Link
            href='https://www.markdownguide.org/cheat-sheet/'
            className='text-end'
          >
            Markdown writing documentation
          </Link>
        </div>

        <div className='mt-3 flex h-full w-full border-2 border-indigo-500 p-6'>
          <div className='flex h-full w-full flex-col'>
            <div className='flex h-full w-full'>
              <div className='flex h-full w-full flex-col'>
                <h1 className='text-md font-medium'>Change blog visibility</h1>
                <p className='text-sm'>This blog is currently {post.postVisibillity}</p>
              </div>

              {/* Selection */}

              <div className='mr-3 flex items-center gap-4'>
                

                <Select onValueChange={handleSelectChangeOnVisibillity}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Change visibility' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {/* Chevron button */}
              </div>
            </div>


            <div className='flex h-full w-full mt-4'>
              <div className='flex h-full w-full flex-col'>
                <h1 className='text-md font-medium'>Change Post tag</h1>
                <p className='text-sm'>You can change this post's tag ex. important: for important information, info: for general news and etc.</p>
              </div>

              {/* Selection */}
              <div className='mr-3 flex items-center gap-4 '>
                <Select onValueChange={handleSelectChangeOnTag}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Change post tag' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='info'>Info</SelectItem>
                      <SelectItem value='important'>important</SelectItem>
                      <SelectItem value='announcement'>Announcement</SelectItem>
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
                    <div className='flex h-full w-full flex-col items-center justify-center'>
                      <div className='flex flex-col items-center justify-center rounded-lg border-2 bg-[#111] p-6 shadow-2xl'>
                        
                        <h1 className='text-2xl'>Are you sure?</h1>

                        <Separator></Separator>

                        <div className='m-7 flex h-[75px] border-2 border-orange-500 bg-orange-400 bg-opacity-35 p-4'>
                          <div className='flex items-center space-x-2'>
                            <TriangleAlert size={24}></TriangleAlert>{' '}
                            <h1>
                              Warning: You are about to <strong>delete</strong>{' '}
                              this post
                            </h1>
                          </div>
                        </div>
                        <div className='w-[70%]'>
                          <p>
                            Deleting this post there will be going back nor
                            recovering this post. this is the last warning
                          </p>
                        </div>
                        <form action={handleSubmit}>
                        <div className='mb-3 mt-5 flex space-x-2'>
                          
                          <input type='checkbox' onChange={(e) => setConfirmed(e.target.checked)}                          ></input>
                          <p>Yes, I am sure. I want to delete this blog</p>
                        </div>
                        
                        <div className='ml-2 mr-2 mt-4 flex w-full justify-center'>
                          <button className='w-full bg-[#1e1e1e] text-base'>
                            Delete this post
                          </button>

                        </div>
                        </form>
                        
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full justify-end space-x-4 gap-4'>
      <form>
        <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
      </form>
      </div>
    </div>
  )
}

// Exporting the function as default
export default EditPost
