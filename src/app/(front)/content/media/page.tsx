'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { PostItems } from '@/types'
import { getPosts } from './actions'
import { useEffect } from 'react'
import { truncateText } from '@/components/truncateText'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'

interface SearchParamsProps {
  searchParams: Promise<{ page?: string }>
}

const Media: React.FC<SearchParamsProps> = ({ searchParams }) => {
  const router = useRouter()
  const pathname = usePathname()

  const [posts, setPosts] = useState<PostItems[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts()
      setPosts(fetchedPosts)
    }

    fetchPosts()
  }, [])

  const [inputValue, setInputValue] = useState('')

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
        return `Posted ${count} ${unit}${count > 1 ? 's' : ''} ago`
      }
    }

    return 'Just now'
  }
  const POSTS_PER_PAGE = 5

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchPage = async () => {
      const params = await searchParams
      setCurrentPage(Number(params.page) || 1)
    }
    fetchPage()
  }, [searchParams])

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  const searchQuery = () => {
    router.push(pathname + `/search?q=${inputValue}`)
  }
  return (
    <div>
      <div className='m-auto w-full md:w-[70%]'>
        <form
          onSubmit={(e) => {
            e.preventDefault() // Prevent the default form submission
            searchQuery() // Trigger the search logic
          }}
          className='flex h-full w-full items-center justify-center'
        >
          <div className='relative w-full'>
            <input
              type='text'
              placeholder='Search...'
              name='searchInput'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className='h-[50px] w-full border-none p-4 outline-none'
            />
            <button
              // onClick={togglePasswordVisibility}
              className='absolute inset-y-0 bottom-2 right-4 text-gray-400'
            >
              <Search></Search>
            </button>
          </div>
        </form>
        <div className='flex h-full w-full flex-col text-[1.4rem] font-bold'>
          <div className='mr-4 mt-4 flex w-full justify-end gap-2'></div>
        </div>
      </div>

      <div className='m-auto mb-6 flex flex-col justify-between space-y-6 pb-4'>
        {paginatedPosts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          paginatedPosts.map((post) => (
            <div key={post.id}>
              <div
                onClick={() =>
                  router.push(
                    `/content/media/blog/published/${post.slug}&?p=${post.id}`
                  )
                }
                className='flex w-full cursor-pointer justify-between space-y-2'
              >
                <div className='flex flex-col gap-2'>
                  <div className='w-full'>
                    <h1
                      // href={`/content/media/blog/published/${post.slug}&?p=${post.id}`}
                      className='text-lg font-semibold text-indigo-500'
                    >
                      {post.title}
                    </h1>
                    {/* <p className='text-sm text-gray-600'>
                      Posted by {post.authorId}
                    </p> */}
                    <p className='text-md'>
                      {timeAgo(new Date(post.createdAt))}
                    </p>
                    <p className='font-sm flex h-full w-full flex-row gap-1 text-sm text-neutral-400'>
                      {truncateText(post.content, 200)}
                    </p>
                  </div>
                </div>
                <div className='mb-2 space-y-2 text-sm'></div>
              </div>
            </div>
          ))
        )}

        {totalPages > 1 && (
          <Pagination className='mt-8'>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  href={`?page=${Math.max(currentPage - 1, 1)}`}
                  className='cursor-pointer'
                >
                  <ChevronLeft className='h-4 w-4' />
                </PaginationLink>
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    href={`?page=${idx + 1}`}
                    isActive={idx + 1 === currentPage}
                    className='cursor-pointer'
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationLink
                  href={`?page=${Math.min(currentPage + 1, totalPages)}`}
                  className='cursor-pointer'
                >
                  <ChevronRight className='h-4 w-4' />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  )
}

export default Media
