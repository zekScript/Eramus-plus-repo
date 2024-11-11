import TextLayout from '@/components/anims/TextLayout'

const Page: React.FC = () => {
  return (
    <>
      {/* Main text */}
      <div className='mb-20 mt-20'>
        <h1 className='text-wrap text-center text-5xl font-medium [text-shadow:_1px_2px_3px_rgba(0,0,0,0.2);]'>
          <span className='text-7xl text-blue-600'>Hello</span>{' '}
          <span className='text-3xl'>To my</span>{' '}
          <span className='text-7xl text-emerald-500'>World</span>
        </h1>
      </div>
      {/* Line */}
      <div className='m-auto flex w-4/12 justify-center bg-black [height:_0.4px]'></div>
      <div className='m-auto mt-4 flex w-10/12 justify-center'>
        <TextLayout></TextLayout>
      </div>
      <h1 className='mb-4 ml-12 mt-24 text-4xl font-bold'>Media</h1>
      <div className='mb-24 ml-12 flex w-56 justify-center bg-black [height:_0.4px]'></div>
      {/* Container for blog post */}
      <div className='m-auto grid h-full w-9/12 grid-cols-3 gap-4 text-white'>
        {/* Placeholder blog post  */}
        {/* Blog Post */}
        <div className='h-96 w-72 rounded-lg bg-neutral-500 [border:_2px_solid_black]'>
          <h1 className='[font-family: cursive] mt-3 text-center text-2xl font-bold [text-shadow:_1px_2px_3px_rgba(0,0,0,0.3);]'>
            Blog 1
          </h1>
          {/* Posted User*/}
          <p className='ml-6 mt-3 text-xs font-medium [text-shadow:_1px_2px_2px_rgba(0,0,0,0.2);]'>
            By Armandas
          </p>
          {/* Text Box */}
          <div className='m-auto mb-3 mt-1 h-3/4 w-5/6 rounded-3xl bg-gray-100 text-sm font-extralight text-black [border:_2px_solid_black]'>
            <p className='m-2'></p>
          </div>
        </div>

        <div className='h-96 w-72 rounded-lg bg-neutral-500 [border:_2px_solid_black]'>
          <h1 className='[font-family: cursive] mt-3 text-center text-2xl font-bold [text-shadow:_1px_2px_3px_rgba(0,0,0,0.3);]'>
            Blog 2
          </h1>
          {/* Posted User*/}
          <p className='ml-6 mt-3 text-xs font-medium [text-shadow:_1px_2px_2px_rgba(0,0,0,0.2);]'>
            By Armandas
          </p>
          {/* Text Box */}
          <div className='m-auto mb-3 mt-1 h-3/4 w-5/6 rounded-3xl bg-gray-100 text-sm font-extralight text-black [border:_2px_solid_black]'>
            <p className='m-2'></p>
          </div>
        </div>

        <div className='h-96 w-72 rounded-lg bg-neutral-500 [border:_2px_solid_black]'>
          <h1 className='[font-family: cursive] mt-3 text-center text-2xl font-bold [text-shadow:_1px_2px_3px_rgba(0,0,0,0.3);]'>
            Blog 3
          </h1>
          {/* Posted User*/}
          <p className='ml-6 mt-3 text-xs font-medium [text-shadow:_1px_2px_2px_rgba(0,0,0,0.2);]'>
            By Armandas
          </p>
          {/* Text Box */}
          <div className='m-auto mb-3 mt-1 h-3/4 w-5/6 rounded-3xl bg-gray-100 text-sm font-extralight text-black [border:_2px_solid_black]'>
            <p className='m-2'></p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Page
