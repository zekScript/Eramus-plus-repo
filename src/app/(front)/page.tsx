'use client'
import Video from '@/components/video'
import A4Animation from '@/components/anims/TextLayout'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import BlogCard from '@/components/blogCard'
import { blogPostSources } from '@/config/site'
import Loader from '@/components/anims/Loader'
import { getCurrentUser } from '@/server/currentUser'

const Page: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <>
      <section>
        <Video></Video>
      </section>
      <section className='ml-12 mt-16 md:ml-0 md:mt-5'>
        <div>
          <div
            className='text-ratio mb-9 mt-64 h-full w-full pl-0 pr-0 md:pl-24 md:pr-24'
            ref={ref}
          >
            {isInView ? <A4Animation /> : <Loader></Loader>}
          </div>
        </div>
      </section>
      <section className='ml-0 mt-5 lg:ml-12 lg:mt-14'>
        <h1 className='mb-4 text-4xl font-bold'>Media</h1>
        <div className='flex w-56 justify-center bg-gray-500 [height:_0.4px]'></div>
        {/* Container for blog post */}

        <div className='grid h-full w-full grid-cols-1 gap-y-20 overflow-hidden p-9 lg:grid-cols-3'>
          <BlogCard blogItems={blogPostSources.blogItems} />
        </div>
      </section>
      <section className='ml-12 mt-12'></section>
    </>
  )
}

export default Page
