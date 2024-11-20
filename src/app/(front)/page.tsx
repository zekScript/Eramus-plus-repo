"use client"
import Video from '@/components/video'
import Carousel from '@/components/carousel'
import A4Animation from '@/components/anims/TextLayout'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import BlogCard from '@/components/blogCard'


export default function Page() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  // const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem ullam hic rem dolorem blanditiis maiores praesentium similique illum, quod ad sit harum impedit, dolor, natus obcaecati soluta. Nobis, illo numquam?";
  // if(text.length > 130){

  // }
  
 
    
  return (
    <>
      <section>
        <Video></Video>
      </section>
      <section className='ml-12 mt-16'>
          <div className='w-full flex justify-center'>
            <div className='w-9/12' ref={ref} >
            {isInView ? <A4Animation /> : <p>Loading Text...</p>}
            </div>
          </div>
      </section>
      <section className='mb-4 ml-12 mt-14'>
        <h1 className='mb-4 text-4xl font-bold text-slate-300'>Media</h1>
        <div className='flex w-56 justify-center bg-gray-500 [height:_0.4px]'></div>
        {/* Container for blog post */}

        <div className='m-auto grid h-full w-full grid-cols-2 gap-y-6 p-9 md:grid-cols-3'>

      <BlogCard></BlogCard>

        </div>
        </section>
      <section className='mt-12 w-full'>
        {/* <Carousel></Carousel> */}
      </section>
      <section className='ml-12 mt-12'>

      
      </section>
    </>
  )
}
