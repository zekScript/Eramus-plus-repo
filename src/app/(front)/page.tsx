"use client"
import Video from '@/components/video'
import Carousel from '@/components/carousel'
import TextLayout from '@/components/anims/TextLayout'


export default function Page() {
  return (
    <>
      <section>
        <Video></Video>
      </section>
      
      <div className='flex w-4/12 justify-center bg-gray-400 [height:_0.4px]'></div>
        <div className='mt-4 w-10/12'>
        <TextLayout></TextLayout>
      </div>
      <section className='mt-52 ml-12 mb-4'>
      
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
        <Carousel></Carousel>
      </section>
      <section className='mt-12 ml-12'>
        <h1>Tell me more about your self!</h1>
      </section>

    </>
  )
}
