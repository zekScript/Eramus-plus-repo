import FadeInContent from './anims/FadeInContent'

// import TextLayout from '@/components/anims/TextLayout'

export default function Video() {
  return (
    <div className='min-h-screen w-full overflow-hidden bg-black'>
      <div className='absolute z-30 flex h-full w-full items-center justify-center overflow-hidden'>
        <FadeInContent></FadeInContent>
      </div>


      <div className='absolute z-[1] h-full w-full object-cover opacity-50'>
        <video
          className='absolute left-0 top-0 z-[-1] h-full w-full object-cover'
          playsInline
          autoPlay
          muted
          loop
          preload='auto'
        >
          <source src='https://ik.imagekit.io/ikmedia/example_video.mp4' />
        </video>
      </div>
    </div>
  )
}
