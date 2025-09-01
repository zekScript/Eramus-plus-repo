import Link from 'next/link'
import { getPostsMadeByYou } from './actions'
import { findUserById } from '@/server/user'
import { getCurrentUserServer } from '@/server/currentUserServer'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { truncateText } from '@/components/truncateText'
import timeAgo from '@/components/time-ago'

type PageProps = {
  params: Promise<{ portfolioID: string }>
  searchParams?: Promise<{ page?: string }>
}

const POSTS_PER_PAGE = 5

const BlogPage: React.FC<PageProps> = async ({ params, searchParams }) => {
  const posts = await getPostsMadeByYou()
  const currentUser = await getCurrentUserServer()

  const { portfolioID } = await params
  const profileID: number = parseInt(portfolioID, 10)
  const profiles = await findUserById(profileID)

  const userPosts = posts.filter((post) => post.authorId === profiles?.id)

  const resolvedSearchParams = await searchParams
  const currentPage = Number(resolvedSearchParams?.page ?? 1)
  const totalPages = Math.ceil(userPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = userPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  )

  return (
    <div className='m-auto h-full w-[80%] justify-center'>
      <div className='mt-12'>
        <div className='border-theme mb-12 flex w-full border-b-2 border-indigo-500'>
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
                <div className='mb-6 flex w-full justify-between space-x-3 space-y-6 border-b pb-4'>
                  <div className='flex flex-col gap-2'>
                    <Link
                      href={`/content/media/blog/published/${post.slug}&?p=${post.id}`}
                    >
                      <div className='w-full'>
                        <h1 className='text-lg font-semibold text-indigo-500'>
                          {post.title}
                        </h1>

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
                    </Link>
                  </div>
                  {post.authorId == currentUser?.id ? (
                    <div className='mb-2 space-y-2 pr-4 text-sm'>
                      <Link
                        href={`/content/blogitems/edit?p=${post.id}`}
                        className='flex text-sm'
                      >
                        Post Properties
                      </Link>
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

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

export default BlogPage
