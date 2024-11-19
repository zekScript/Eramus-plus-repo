"use client"
import Video from '@/components/video'
import Carousel from '@/components/carousel'
import A4Animation from '@/components/anims/TextLayout'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useEffect } from 'react'

export default function Page() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <>
      <section>
        <Video></Video>
      </section>
      <section>
          <div className='w-full flex justify-center'>
            <div className='ml-12 mt-72 w-9/12 ' ref={ref} >
            {isInView ? <A4Animation /> : <p>Loading...</p>}
            </div>
          </div>
      </section>
      <section className='mb-4 ml-12 mt-52'>
        <h1 className='mb-4 text-4xl font-bold'>Media</h1>
        <div className='flex w-56 justify-center bg-gray-400 [height:_0.4px]'></div>
        {/* Container for blog post */}
        <div className='m-auto grid h-full w-full grid-cols-2 gap-y-6 p-9 md:grid-cols-5'>
          {/* Placeholder blog post  */}

          <div className='text-break h-[200px] w-[200px] text-xl font-bold'>
            <img src='https://placehold.co/1920x728'></img>
            <h1 className='p-2'>Today a man fell to the lego city, HEY!!</h1>
          </div>
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
