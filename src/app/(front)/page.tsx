import TextLayout from '@/components/anims/TextLayout'

const Page: React.FC = () => {
  return (
    <>
      {/* Main text */}
      <div className='mb-20'>
        <h1 className='text-wrap text-center text-7xl font-medium md:text-9xl'>
          Hello To My World
        </h1>
      </div>
      {/* Line */}
      <div className='m-auto flex w-4/12 justify-center bg-gray-400 [height:_0.4px]'></div>
      <div className='m-auto mt-4 flex w-10/12 justify-center'>
        <TextLayout></TextLayout>
      </div>

      <h1 className='mb-4 ml-12 mt-24 text-4xl font-bold'>Media</h1>
      <div className='mb-24 ml-12 flex w-56 justify-center bg-gray-400 [height:_0.4px]'></div>
      {/* Container for blog post */}
      <div className='m-auto grid h-full w-full grid-cols-2 gap-y-6 p-9 md:grid-cols-5'>
        {/* Placeholder blog post  */}

        <div className='text-break h-[200px] w-[200px] text-xl font-bold'>
          <img src='https://placehold.co/1920x728'></img>
          <h1 className='p-2'>Today a man fell to the lego city, HEY!!</h1>
        </div>
      </div>
    </>
  )
}
export default Page
