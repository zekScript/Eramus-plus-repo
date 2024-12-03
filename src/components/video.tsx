import FadeInContent from './anims/FadeInContent'
import { carouselItems } from '@/config/site'

// import TextLayout from '@/components/anims/TextLayout'

const Video: React.FC = () => {
  return (
    <div className='relative min-h-[100vh] w-full overflow-hidden bg-black'>
      {' '}
      <div className='absolute z-30 flex h-full w-full items-center justify-center overflow-hidden'>
        <FadeInContent carouselItems={carouselItems.carouselItems} />
      </div>
      {/* Background video with pointer-events: none to avoid blocking interactions */}
      <div className='absolute z-[1] h-full w-full object-cover opacity-30'>
        <video
          className='absolute z-[-1] h-full w-full object-cover'
          playsInline
          autoPlay
          muted
          loop
          style={{ pointerEvents: 'none' }} // Prevent interactions with the video
        >
          <source src='backgroundVideoP2.mp4' />
        </video>
      </div>
    </div>
  )
}

export default Video
