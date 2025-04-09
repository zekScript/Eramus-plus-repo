import Link from 'next/link'
import { getPostsMadeByYou } from './actions'
import { findUserById } from '@/server/user'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProfileProps {
  params: { portfolioID: string }
  searchParams: { page?: string }
}

const POSTS_PER_PAGE = 5

export default async function BlogPage({ params, searchParams }: ProfileProps) {
  const posts = await getPostsMadeByYou()
  const profileID: number = parseInt(params.portfolioID, 10)
  const profiles: any = await findUserById(profileID)

  // ✅ Filter user posts first
  const userPosts = posts.filter((post) => post.authorId === profiles?.id)

  // ✅ Pagination logic
  const currentPage = Number(searchParams.page) || 1
  const totalPages = Math.ceil(userPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = userPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  )

  const truncateText = (text: string, length: number) =>
    text.length > length ? `${text.slice(0, length)}...` : text

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

  return (
    <div className='m-auto h-full w-[90%] justify-center'>
      <div className='mt-12'>
        <div className='mb-12 flex w-[90%] border-b-2 border-indigo-500'>
          <h1 className='mb-2 text-2xl font-medium'>
            All posts made by {profiles?.name}
          </h1>
        </div>

        <div className='h-full w-full overflow-hidden'>
          {paginatedPosts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            paginatedPosts.map((post) => (
              <div key={post.id}>
                <div className='mb-6 flex w-[80%] justify-between space-x-3 space-y-6 border-b pb-4'>
                  <div className='flex flex-col gap-2'>
                    <div className='w-full'>
                      <Link
                        href={`/content/media/blog/published/${post.slug}&?p=${post.id}`}
                        className='text-lg font-semibold text-indigo-500'
                      >
                        {post.title}
                      </Link>
                      <p className='text-sm text-gray-600'>
                        Posted by {profiles?.name}
                      </p>
                      <p className='text-md'>
                        {timeAgo(new Date(post.createdAt))}
                      </p>
                      <p className='font-sm h-full w-full text-sm text-neutral-400'>
                        {truncateText(post.content, 200)}
                      </p>
                    </div>
                  </div>
                  <div className='mb-2 space-y-2 text-sm'>
                    <Link
                      href={`/content/blogitems/edit?p=${post.id}`}
                      className='flex text-sm'
                    >
                      Post Settings
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ✅ Pagination */}
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
