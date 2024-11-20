'use client'
import Video from '@/components/video'
import A4Animation from '@/components/anims/TextLayout'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import BlogCard from '@/components/blogCard'
import { blogPostSources } from '@/config/site'

export default function Page() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <>
      <section>
        <Video></Video>
      </section>
      <section className='ml-12 mt-16'>
        <div className='flex w-full justify-center'>
          <div className='flex w-full justify-center pl-24 pr-24' ref={ref}>
            {isInView ? <A4Animation /> : <p>Loading Text...</p>}
          </div>
        </div>
      </section>
      <section className='mb-4 ml-12 mt-14'>
        <h1 className='mb-4 text-4xl font-bold'>Media</h1>
        <div className='flex w-56 justify-center bg-gray-500 [height:_0.4px]'></div>
        {/* Container for blog post */}

        <div className='m-auto grid h-full w-full grid-cols-1 gap-y-20 p-9 lg:grid-cols-3'>
          <BlogCard blogItems={blogPostSources.blogItems} />
        </div>
      </section>
      <section className='mt-12 w-full'>{/* <Carousel></Carousel> */}</section>
      <section className='ml-12 mt-12'></section>
    </>
  )
}
