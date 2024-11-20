"use client"
import Video from '@/components/video'
import Carousel from '@/components/carousel'
import A4Animation from '@/components/anims/TextLayout'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Page() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  // const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem ullam hic rem dolorem blanditiis maiores praesentium similique illum, quod ad sit harum impedit, dolor, natus obcaecati soluta. Nobis, illo numquam?";
  // if(text.length > 130){

  // }
  
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  
  const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem ullam hic rem dolorem blanditiis maiores praesentium similique illum, quod ad sit harum impedit, dolor, natus obcaecati soluta. Nobis, illo numquam?";
  const truncatedText = truncateText(text, 130);
    
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
          {/* Placeholder blog post  */}

          <div className='text-break h-[370px] w-[350px] bg-red-500 text-xl font-bold'>
            
            <img src='https://placehold.co/1920x728'></img>
            <div className='ml-2 mt-2'>
            <h1 className=''>Today a storm happened in Maribor</h1>
            {/* Date realeased the post */}
            <p className='font-extralight text-sm'>March 16, 2024</p>
            <p className='font-sm text-base w-full h-full'>{truncatedText}</p>
            {/* Profile Avatar */}
              <div className='p-2 mt-3 flex'>
            <Avatar>
            <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <p className='text-xs font-light flex items-center ml-2'>Armandas Latanauskas</p>
              </div>
            </div>
          </div>

          <div className='text-break h-[320px] w-[350px] bg-red-500 text-xl font-bold'>
            
            <img src='https://placehold.co/1920x728'></img>
            <div className='ml-2 mt-2'>
            <h1 className=''>Today a storm happened in Maribor</h1>
            {/* Date realeased the post */}
            <p className='font-extralight text-sm'>March 16, 2024</p>
            <p className='font-sm text-base w-full h-full'>{truncatedText}</p>
            </div>
          </div>

          <div className='text-break h-[320px] w-[350px] bg-red-500 text-xl font-bold'>
            
            <img src='https://placehold.co/1920x728'></img>
            <div className='ml-2 mt-2'>
            <h1 className=''>Today a storm happened in Maribor</h1>
            {/* Date realeased the post */}
            <p className='font-extralight text-sm'>March 16, 2024</p>
            <p className='font-sm text-base w-full h-full'>{truncatedText}</p>
            </div>
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
