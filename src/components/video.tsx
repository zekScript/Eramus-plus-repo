import FadeInContent from "./anims/FadeInContent"

// import TextLayout from '@/components/anims/TextLayout'

export default function Video() {
      return (
                        <div className='overflow-hidden min-h-screen w-full bg-black'>
                                    
                                    <div className='absolute h-full w-full z-30 flex justify-center items-center'>
                                          <FadeInContent></FadeInContent>
                                    </div>
                              
                              <div className=' opacity-50 absolute z-[1] w-full h-full object-cover'>
                                    <video className="absolute z-[-1] w-full h-full object-cover top-0 left-0" playsInline autoPlay muted loop preload="auto" >
                                    <source src="https://ik.imagekit.io/ikmedia/example_video.mp4" />
                                    </video>
                              </div>
                        </div>
      )
    }