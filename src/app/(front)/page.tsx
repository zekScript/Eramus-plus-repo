import TextLayout from '@/components/anims/TextLayout'

const Page: React.FC = () => {
  return (
    <>
      {/* Main text */}
      <div className='mb-20 mt-20'>
        <h1 className='text-wrap text-center text-5xl font-medium [text-shadow:_1px_2px_3px_rgba(0,0,0,0.2);]'>
          <span className='text-7xl text-emerald-500'>Hello</span>{' '}
          <span className='text-3xl'>To my</span>
          <span className='text-7xl text-emerald-500'>World</span>
        </h1>
      </div>
      {/* Line */}
      <div className='m-auto flex bg-gray-400 w-4/12 justify-center [height:_0.4px]'></div>
      <div className='m-auto mt-4 flex w-10/12 justify-center'>
        <TextLayout></TextLayout>
      </div>
      <h1 className='mb-4 ml-12 mt-24 text-4xl font-bold'>Media</h1>
      <div className='mb-24 ml-12 flex w-56 justify-center bg-gray-400 [height:_0.4px]'></div>
      {/* Container for blog post */}
      <div className='m-auto p-9 grid h-full w-full grid-cols-subgrid gap-4'>
        {/* Placeholder blog post  */}        
          <div className='text-break w-[200px] h-[200px] font-bold text-xl'>
            <img src='https://placehold.co/1920x728'></img>
            <h1 className='p-2'>Placeholder Placeholder Placeholder Placeholder</h1>
          </div>
        
      </div>
    </>
  )
}
export default Page
