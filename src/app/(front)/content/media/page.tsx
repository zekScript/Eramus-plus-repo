"use client"
import BlogCard from '@/components/blogCard'
import { blogPostSources } from '@/config/site'
import { search } from '@/server/search'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const Media: React.FC = () => {
const router = useRouter();
const pathname = usePathname();

  const [inputValue, setInputValue] = useState('');

  const searchQuery = () => {
    router.push(pathname + `/search?q=${inputValue}`);
  };
  console.log(inputValue)
  return (
    <>
      <h1 className='mb-12 mt-12 text-center font-serif text-6xl italic'>
        Media
      </h1>
              {/* Search query */}
              <div className='h-[50vh] w-full'>
              <div className='flex w-full justify-center items-center h-full'>
              <div className='flex w-full max-w-2xl items-center justify-between rounded-full border-2 p-4 shadow-md bg-black'>

<form action={searchQuery} className='flex w-full h-full items-center justify-between'>
  <input
    type='text' 
    placeholder='Search...'
    name='searchInput'
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    className='w-full border-none outline-none bg-black h-full'
  />
  <button className='ml-4 rounded-full bg-blue-500 px-4 py-2 text-white'>
    Search
  </button>
</form>
</div>

</div>
              </div>
      

    
      <div className='m-auto grid h-full w-full grid-cols-1 gap-y-20 p-9 lg:grid-cols-3'>
        
        <BlogCard blogItems={blogPostSources.blogItems} />
      </div>
    </>
  )
}

export default Media
