'use client'

import { findPostById, likePost, dislikePost } from '@/server/post'
import { CalendarDays, Eye, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { getCurrentUser } from '@/server/currentUser'
import { findUserById } from '@/server/user'

type Props = {
  children: React.ReactNode
  initialLikes: number
  initialDislikes: number
}

const WikiLayout: React.FC<Props> = ({
  children,
  initialLikes,
  initialDislikes,
}) => {
  const searchParams = useSearchParams()
  const postId = searchParams.get('p') as string
  const currentLoggedInUser = getCurrentUser()

  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const [user, setUser] = useState<{
    id: number
    name: string
    password: string
    email: string
    accessAdmin: boolean | null
    createdAt: Date
    updatedAt: Date
    role: string
    followersCount: number
    followingCount: number
    bio: string | null
  } | null>(null)

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
    const fetchPost = async () => {
      if (!postId) return
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

  const handleLike = async () => {
    if (liked) return
    const updatedLikes = await likePost(postId)
    setLikes(updatedLikes)
    setLiked(true)
  }

  const handleDislike = async () => {
    if (disliked) return
    const updatedDislikes = await dislikePost(postId)
    setDislikes(updatedDislikes)
    setDisliked(true)
  }

  return (
    <>
      <div className='flex h-full w-full flex-row'>
        <div className='ml-[15%] flex h-full w-full'>
          {children}

          <div className='h-full w-[55%]'>
            <div className='h-full w-full'>
              <div>
                {!post ? (
                  <p>Post unavailable</p>
                ) : (
                  <div>
                    <div className='flex h-full w-full justify-between space-x-2'>
                      <div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Link
                              className='text-normal font-bold'
                              href={`/profiles/${post.authorId}`}
                            >
                              Armandas Latanauskas
                            </Link>
                          </HoverCardTrigger>
                          <HoverCardContent className='w-80'>
                            <div className='flex justify-between space-x-4'>
                              <Avatar>
                                <AvatarImage src='https://github.com/vercel.png' />
                                <AvatarFallback>VC</AvatarFallback>
                              </Avatar>
                              <div className='space-y-1'>
                                <h4 className='text-sm font-semibold'>
                                  Armandas Latanauskas
                                </h4>
                                <p className='text-sm'>This user's bio</p>
                                <div className='flex items-center pt-2'>
                                  <CalendarDays className='mr-2 h-4 w-4 opacity-70' />
                                  <span className='text-xs text-muted-foreground'>
                                    Joined December 2021
                                  </span>
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>

                        <p className='text-md text-gray-500'>521 posts made</p>
                      </div>

                      <div>
                        {currentLoggedInUser?.id === post.authorId && (
                          <div>
                            <Link href={`/content/blogitems/edit?p=${post.id}`}>
                              Post properties
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />
                    <div className='mt-3'>
                      <p className='text-sm'>
                        This post was made in:{' '}
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <p className='text-sm'>
                        Last updated:{' '}
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </p>
                      <Badge variant={post.badge && ["info", "default", "destructive", "outline", "secondary", "important", "announcement", "notspecified"].includes(post.badge) ? post.badge as "info" | "default" | "destructive" | "outline" | "secondary" | "important" | "announcement" | "notspecified" : undefined}>
  {post.badge}
</Badge>
                    </div>

                    <div className='mt-6 flex flex-col border-b-2 border-slate-600 pb-2'>
                      <h3>Leave this post a rating</h3>
                    </div>

                    <div className='mt-3 flex h-full items-center space-x-2 rounded-[5rem] border-2 border-gray-800'>
                      <div
                        className={cn(
                          'flex w-full items-center space-x-2 p-4 transition-colors duration-300'
                        )}
                      >
                        <button
                          onClick={handleLike}
                          className='flex items-center gap-1'
                        >
                          <ThumbsUp
                            className={
                              liked
                                ? 'rounded-full bg-green-600 p-1 text-white'
                                : ''
                            }
                          />
                          <span>{post.likes}</span>
                        </button>

                        <button
                          onClick={handleDislike}
                          className='flex items-center gap-1'
                        >
                          <ThumbsDown
                            className={
                              disliked
                                ? 'rounded-full bg-red-600 p-1 text-white'
                                : ''
                            }
                          />
                          <span>{post.dislikes}</span>
                        </button>

                        <p className='text-sm text-gray-600'>
                          Note: Like & dislike is under maintenance!
                        </p>
                      </div>
                    </div>

                    <div className='m-3 flex space-x-2'>
                      <Eye />
                      <span>{post.views} views</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WikiLayout
