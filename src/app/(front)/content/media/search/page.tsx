'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { search } from '@/server/search' // Import the server action
import { useRouter, usePathname } from 'next/navigation'
import { PostItems } from '@/types'
import ReactMarkdown from 'react-markdown'
import { truncateText } from '@/components/truncateText'


import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
type ResultProps = {
  success: boolean
  message: string
  posts: PostItems[]
}

interface SearchParamsProps {
  searchParams: Promise<{ page?: string }>
}
const SearchQueryPage: React.FC<SearchParamsProps> = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [inputValue, setInputValue] = useState('')
  // const [AthorUser, setAuthorUser] = useState<UserItems | null>(null)

  const searchQuery = () => {
    router.push(pathname + `?q=${inputValue}`)
  }
  const searchParams = useSearchParams() // This remains unchanged
  const [result, setResult] = useState<ResultProps | null>(null)
  const q = searchParams.get('q') || ''

  useEffect(() => {
    const getResults = async () => {
      const data = await search(q) // Call server action directly
      setResult({
        ...data,
        posts: data.posts || [], // Ensure posts is always an array
      })
    }

    if (q) getResults()
  }, [q])

  
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
  // const [isOpen, setIsOpen] = useState(false) // State to manage dropdown visibility

  // const handleChevronClick = () => {
  //   setIsOpen((prev) => !prev) // Toggle the dropdown open/close
  // }

  const POSTS_PER_PAGE = 5

  const currentPage = Number(searchParams.get('page')) || 1
  const totalPages = result
    ? Math.ceil(result.posts.length / POSTS_PER_PAGE)
    : 0
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts =
    result?.posts?.slice(startIndex, startIndex + POSTS_PER_PAGE) || []

  return (
    <div className='p-4'>
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
          {/* <div>Filter window</div> */}

          {/* Whole container */}
          {/* <div className='mt-3 h-full w-full'>
            <div className='border-settings mt-3 flex h-full w-full p-6'>
              <div className='flex h-full w-full flex-col'>
                <div className='flex h-full w-full'>
                  <div className='flex h-full w-full flex-col'>
                    <h1 className='text-xl font-medium'>Filters</h1>
                  </div>

                  <div className='mr-3 flex items-center gap-4'>
                    <Select></Select>
                    <div
                      onClick={handleChevronClick}
                      className='cursor-pointer'
                    >
                      {isOpen ? <ChevronUp /> : <ChevronDown />}{' '}
                    </div>
                  </div>
                </div>


                <div>
                  {isOpen && (
                    <div className='flex h-full w-full items-start'>

                      <div className='space-y-2 mt-7'>
                        <div>
                        <h4>category</h4>
                        <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            <SelectItem value="info">Info</SelectItem>
                            <SelectItem value="important">Important</SelectItem>
                            <SelectItem value="announcement">Announcement</SelectItem>
                            <SelectItem value="not specified">Not Specified</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                        </div>
                        
                        <div>
                          <h1>Search by user</h1>
                        <input placeholder='search by user...'></input>

                        </div>


                      </div>

                    </div>
                  )}
                </div>
              </div>
            </div>
          </div> */}
          <div className='mr-4 mt-4 flex w-full justify-end gap-2'></div>
        </div>
      </div>

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
                    // href={``}
                    className='text-lg font-semibold text-indigo-500'
                  >
                    {post.title}
                  </h1>
                  {/* <p className='text-sm text-gray-600'>
                      Posted by {post.authorId}
                    </p> */}
                  <p className='text-sm text-gray-600'>
                    {/* Posted by {profiles?.name} */}
                  </p>
                  <p className='text-md'>{timeAgo(new Date(post.createdAt))}</p>
                  <p className='font-sm h-full w-full text-sm text-neutral-400'>
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
                href={`?q=${q}&page=${Math.max(currentPage - 1, 1)}`}
                className='cursor-pointer'
              >
                <ChevronLeft className='h-4 w-4' />
              </PaginationLink>
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink
                  href={`?q=${q}&page=${idx + 1}`}
                  isActive={idx + 1 === currentPage}
                  className='cursor-pointer'
                >
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationLink
                href={`?q=${q}&page=${Math.min(currentPage + 1, totalPages)}`}
                className='cursor-pointer'
              >
                <ChevronRight className='h-4 w-4' />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* {result?.success ? (
        <div className='mt-4 space-y-2'>
          {result.posts.map((post: PostItems) => (
            <div
              key={post.id}
              className='m-auto mb-6 flex w-[50%] justify-between space-y-6 pb-4'
            >
              <div className='flex flex-col gap-2'>
                <div className='w-full'>
                  <h2 className='text-lg font-semibold text-indigo-500'>
                    {post.title}
                  </h2>
                  <p className='text-sm'>{timeAgo(new Date(post.createdAt))}</p>
                  <p className='font-sm h-full w-full text-sm text-gray-500'>
                    
                    <ReactMarkdown>{truncateText(post.content, 200)}</ReactMarkdown>
                  </p>
                </div>

                <div className='flex gap-3 text-sm font-semibold text-indigo-500'>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='m-auto w-full flex justify-center mt-7'>
          <Loader />
        </div>
      )} */}
    </div>
  )
}

export default SearchQueryPage
