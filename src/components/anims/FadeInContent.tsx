'use client'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { CarouselSourcesItem } from '@/types'

interface CarouselProps {
  carouselItems: CarouselSourcesItem[]
}

const FadeInContent: React.FC<CarouselProps> = ({ carouselItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentItem = carouselItems[currentIndex]

  const squareIndicators = carouselItems?.map((item, index) => (
    <div
      key={item.id}
      onClick={() => setCurrentIndex(index)} // Update index when clicked
      className={`h-[6px] w-6 cursor-pointer ${
        currentIndex === index ? 'bg-slate-200' : 'bg-gray-500'
      }`}
    />
  ))

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1
    )
  }

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === carouselItems.length - 1 ? 0 : prev + 1
    )
  }
  return (
    <>
      <motion.div
        className='absolute right-[50%] ml-12 mt-36 overflow-hidden'
        initial={{ opacity: 0, scale: 0.95, x: -100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        drag='x'
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, info) => {
          if (info.offset.x < -100) {
            nextSlide()
          } else if (info.offset.x > 100) {
            prevSlide()
          }
        }}
      >
        <div className='h-full w-full'>
          <h1 className='text-lg font-bold text-slate-200 md:text-4xl'>
            {currentItem.mainTitle}
            {/* Placeholder */}
          </h1>
          <p className='mt-6 font-serif text-lg font-light text-slate-400 md:text-2xl'>
            {currentItem.description}
          </p>
        </div>
        <div className='relative mt-32 flex w-full items-end justify-center'>
          <ChevronLeft
            size={40}
            onClick={prevSlide}
            className='hidden cursor-pointer text-slate-200 transition-transform duration-1000 hover:scale-150 hover:text-slate-100 md:flex'
          ></ChevronLeft>
          {/* Indicators */}
          <div className='ml-8 mr-8 flex h-full items-end gap-x-2 transition-transform duration-1000 hover:scale-125'>
            {squareIndicators}
          </div>
          <ChevronRight
            className='hidden cursor-pointer text-slate-200 transition-transform duration-1000 hover:scale-150 hover:text-slate-100 md:flex'
            onClick={nextSlide}
            size={40}
          ></ChevronRight>
        </div>
      </motion.div>

      <motion.div
        className='relative left-[40%] top-[100px] ml-0 hidden h-[400px] w-[960px] md:flex'
        initial={{ x: 80, scale: 0.9, opacity: 0 }}
        animate={{
          x: 0,
          scale: 1,
          opacity: 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 25,
          duration: 0.5,
          delay: 0.3,
        }}
      >
        <motion.div key={currentItem.src}>
          <img
            className='object-cover transition-transform duration-500 hover:translate-x-[-75px]'
            src={currentItem.src}
          ></img>
        </motion.div>
      </motion.div>
    </>
  )

  // className='focus-pic absolute left-[50%] top-[190px]'
}

export default FadeInContent
