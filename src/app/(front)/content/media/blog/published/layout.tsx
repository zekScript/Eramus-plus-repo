'use client'

import { findPostById, likePost, dislikePost, getAuthorMadeTotalPostAmount } from '@/server/post'
import {
  CalendarDays,
  Eye,
  Share,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Copy,
  Check,
} from 'lucide-react'
import { UserItems, PostItems } from '@/types'
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
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
  const pathname = usePathname()

  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const [user, setUser] = useState<UserItems | null>(null)

  function timeAgo(date: Date): string {
    const now: Date = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    }

    if (seconds > intervals.year * 5) {
      return `Posted on ${date.toLocaleDateString()}`
    }

    for (const [unit, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value)
      if (count > 0) {
        return ` ${count} ${unit}${count > 1 ? 's' : ''} ago`
      }
    }

    return 'Just now'
  }

  const [post, setPost] = useState<PostItems | null>(null)

  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [address] = useState(
    'https://erasmus-plus-project-git-armandascode-zekscripts-projects.vercel.app/' +
      pathname +
      '&?p=' +
      postId
  )

  const [postCount, setPostCount] = useState(0)

  const handleCalcPostCount = async () => {

    const count = await getAuthorMadeTotalPostAmount(user?.id as number);
    setPostCount(count)
  }
  handleCalcPostCount()

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

  function getFirstLettersForFallback(str?: string) {
    if (!str) return ''
    return str
      .split(' ') // Split the string into an array of words
      .map((word) => word.charAt(0).toUpperCase()) // Take the first letter of each word and capitalize it
      .join('') // Combine the letters without spaces
  }

  const handleCopy = (event: React.MouseEvent) => {
    event.preventDefault() // Prevent the dropdown from closing
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1000) // Reset the icon after 2 seconds
    })
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (!post) return
      try {
        const user = await findUserById(post.authorId)
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()
  }, [post])

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
                              {user?.name}
                            </Link>
                          </HoverCardTrigger>
                          <HoverCardContent className='w-80'>
                            <div className='flex space-x-4'>
                              <Avatar>
                                <AvatarImage
                                  src='https://i.pinimg.com/564x/9f/e2/43/9fe24317d8363d84b3eb3b93b9c756ae.jpg'
                                  alt='Profile avatar'
                                />
                                <AvatarFallback>
                                  {getFirstLettersForFallback(user?.name ?? '')}
                                </AvatarFallback>
                              </Avatar>
                              <div className='space-y-1'>
                                <h4 className='text-sm font-semibold'>
                                  {user?.name}
                                </h4>
                                {user?.bio == '' ? (
                                  <p className='text-sm'>
                                    This user does not have yet made a bio
                                  </p>
                                ) : (
                                  <p className='text-sm'>{user?.bio}</p>
                                )}
                                <div className='flex items-center pt-2'>
                                  <CalendarDays className='mr-2 h-4 w-4 opacity-70' />
                                  <span className='text-xs text-muted-foreground'>
                                    Account made in{' '}
                                    {user?.createdAt.toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>

                        <p className='text-md text-gray-500'>{postCount} posts made</p>
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
                        {new Date(post.createdAt).toLocaleDateString()} (
                        <span className='text-sm text-gray-300'>
                          {timeAgo(new Date(post.createdAt))}
                        </span>{' '}
                        )
                      </p>

                      <Badge
                        className='mt-3'
                        variant={
                          post.badge &&
                          [
                            'info',
                            'default',
                            'destructive',
                            'outline',
                            'secondary',
                            'important',
                            'announcement',
                            'notspecified',
                          ].includes(post.badge)
                            ? (post.badge as
                                | 'info'
                                | 'default'
                                | 'destructive'
                                | 'outline'
                                | 'secondary'
                                | 'important'
                                | 'announcement'
                                | 'notspecified')
                            : undefined
                        }
                      >
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
                        <Button
                          variant='outline'
                          onClick={handleLike}
                          className='flex items-center gap-1'
                        >
                          <ThumbsUp
                            className={
                              liked
                                ? 'rounded-full bg-gray-100 text-slate-600'
                                : ''
                            }
                          />
                          <span>{post.likes}</span>
                        </Button>

                        <Button
                          variant='outline'
                          onClick={handleDislike}
                          className='flex items-center gap-1'
                        >
                          <ThumbsDown
                            className={
                              disliked
                                ? 'rounded-full bg-gray-100 text-slate-600'
                                : ''
                            }
                          />
                          <span>{post.dislikes}</span>
                        </Button>

                        <p className='text-sm text-gray-600'>
                          Note: Like & dislike is under maintenance!
                        </p>
                      </div>
                    </div>

                    <div className='m-3 flex justify-between space-x-2'>
                      <div className='flex space-x-2'>
                        <Eye />
                        <span>{post.views} views</span>
                      </div>

                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant='outline'>
                            Share{' '}
                            <span>
                              <Share2 />
                            </span>
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className='w-80'>
                          <div className='flex flex-col'>
                            <div className='flex h-full w-full items-center space-x-2'>
                              <span>
                                <Share2 size={16} />
                              </span>
                              <h1>Share post</h1>
                            </div>
                            <Separator
                              orientation='horizontal'
                              className='m-4'
                            ></Separator>
                            <div className='flex space-x-2'>
                              <input
                                type='text'
                                readOnly
                                value={address}
                                className='w-full rounded-md border border-gray-700 px-2 py-1 text-sm'
                              />
                              <button
                                onClick={handleCopy}
                                aria-label='Copy to clipboard'
                              >
                                <div key={copied ? 'check' : 'copy'}>
                                  {copied ? (
                                    <Check size={16} />
                                  ) : (
                                    <Copy size={16} />
                                  )}
                                </div>
                              </button>
                            </div>
                            <div className='mt-4 text-sm text-gray-500'>
                              <p>Share this post with this url</p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
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
