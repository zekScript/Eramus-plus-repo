'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { search } from '@/server/search' // Import the server action
import { useRouter, usePathname } from 'next/navigation'
import { Select } from '@/components/ui/select'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { PostItems } from '@/types'

type ResultProps = {
  success: boolean
  message: string
  posts: PostItems[]
}
const SearchQueryPage: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [inputValue, setInputValue] = useState('')

  const searchQuery = () => {
    router.push(pathname + `?q=${inputValue}`)
  }
  const searchParams = useSearchParams()
  const [result, setResult] = useState<ResultProps | null>(null)
  console.log(result)
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
  const [isOpen, setIsOpen] = useState(false) // State to manage dropdown visibility

  const handleChevronClick = () => {
    setIsOpen((prev) => !prev) // Toggle the dropdown open/close
  }

  return (
    <div className='p-4'>
      <div className='m-auto w-[50%]'>
        <form
          action={searchQuery}
          className='flex h-full w-full items-center justify-center'
        >
          <input
            type='text'
            placeholder='Search...'
            name='searchInput'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='h-[50px] w-full border-none outline-none'
          />
          {/* <button className='ml-4 rounded-full bg-indigo-600 px-4 py-2 text-white'>
                Search
              </button> */}
        </form>
        <div className='flex h-full w-full flex-col text-[1.4rem] font-bold'>
          <div>Filter window</div>

          {/* Whole container */}
          <div className='mt-3 h-full w-full'>
            <div className='border-settings mt-3 flex h-full w-full p-6'>
              <div className='flex h-full w-full flex-col'>
                <div className='flex h-full w-full'>
                  <div className='flex h-full w-full flex-col'>
                    <h1 className='text-xl font-medium'>Filters</h1>
                  </div>

                  {/* Selection */}
                  <div className='mr-3 flex items-center gap-4'>
                    {/* onOpenChange={setIsOpen} */}
                    <Select></Select>
                    {/* Chevron button */}
                    <div
                      onClick={handleChevronClick}
                      className='cursor-pointer'
                    >
                      {isOpen ? <ChevronUp /> : <ChevronDown />}{' '}
                      {/* Toggle Chevron based on isOpen */}
                    </div>
                  </div>
                </div>

                {/* Expanded content */}

                <div>
                  {/* Color picker templates  */}
                  {isOpen && (
                    <div className='flex h-full w-full items-start'>
                      <h1>Hello world</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='mr-4 mt-4 flex w-full justify-end gap-2'></div>
        </div>
      </div>
      <h1 className='text-xl font-bold'>Search Results</h1>
      {result?.success ? (
        <ul className='mt-4 space-y-2'>
          {result.posts.map((post: PostItems) => (
            <div
              key={post.id}
              className='m-auto mb-6 flex w-[50%] justify-between space-y-6 border-b pb-4'
            >
              <div className='flex flex-col gap-2'>
                <div className='w-full'>
                  <h2 className='text-lg font-semibold text-indigo-500'>
                    {post.title}
                  </h2>
                  <p className='text-sm'>{timeAgo(new Date(post.createdAt))}</p>
                  <p className='font-sm h-full w-full text-sm text-gray-500'>
                    {truncateText(post.content, 200)}
                  </p>
                </div>

                <div className='flex gap-3 text-sm font-semibold text-indigo-500'>
                  {/* Extra options */}
                  {/* <Link href='/stats'>Statistics</Link>
                <p>Views: 999</p>
                <p>Likes: 999</p>
                <p>Dislikes: 999</p> */}
                </div>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p className='mt-4 text-gray-500'>
          {result?.message || 'Searching...'}
        </p>
      )}
    </div>
  )
}

export default SearchQueryPage
