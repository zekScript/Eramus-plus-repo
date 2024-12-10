const Loading: React.FC = () => {
  return (
    <>
      <div className='absolute bottom-0 left-0 right-0 top-0 z-[111111111] h-full w-full'>
        <div className='flex h-full w-full items-center justify-center'>
          <h1>Loading content...</h1>
        </div>
      </div>
    </>
  )
}

export default Loading
