import FadeInContent from './anims/FadeInContent'
import { carouselItems } from '@/config/site'

// import TextLayout from '@/components/anims/TextLayout'

export default function Video() {
  return (
    <div className='min-h-[100vh] w-full overflow-hidden bg-black'>
      <div className='absolute z-30 flex h-full w-full items-center justify-center overflow-hidden'>
        <FadeInContent
          carouselItems={carouselItems.carouselItems}
        ></FadeInContent>
      </div>

      <div className='absolute z-[1] h-full w-full object-cover opacity-50'>
        <video
          className='absolute z-[-1] h-full w-full object-cover'
          playsInline
          autoPlay
          muted
          loop
          preload='auto'
        >
          <source src='backgroundVideoP2.mp4' />
        </video>
      </div>
    </div>
  )
}
