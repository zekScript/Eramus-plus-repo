'use client'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function FadeInContent() {
  const items = [
    {
      id: 1,
      src: 'https://g.fp.ps.netease.com/market/file/5cbfc569a7f25262e5e1dbd0p2AlOda702',
      mainTitle: 'Armandas Latanauskas',
      description: 'Innovation starts with a single line of code.',
    },
    {
      id: 2,
      src: 'https://g.fp.ps.netease.com/market/file/5cbfc569a7f25262e5e1dbd0p2AlOda702',
      mainTitle: 'Armandas Latanauskas',
      description: 'Innovation starts with a single line of code.',
    },
    {
      id: 3,
      src: 'https://g.fp.ps.netease.com/market/file/5cbfc569a7f25262e5e1dbd0p2AlOda702',
      mainTitle: 'Armandas Latanauskas',
      description: 'Innovation starts with a single line of code.',
    },
    {
      id: 4,
      src: 'https://g.fp.ps.netease.com/market/file/5cbfc569a7f25262e5e1dbd0p2AlOda702',
      mainTitle: 'Armandas Latanauskas',
      description: 'Innovation starts with a single line of code.',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const squareIndicators = items.map((id, index) => (
    <div
      key={index}
      onClick={() => setCurrentIndex(index)}
      className={`shape h-[6px] w-6 bg-gray-400 ${
        currentIndex === index ? 'bg-slate-200' : 'bg-gray-500'
      }`}
    ></div>
  ))

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }
  return (
    <>
      <motion.div
        className='absolute right-[60%] mt-36 overflow-hidden'
        initial={{ opacity: 0, scale: 0.95, x: -100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className='text-lg font-bold text-slate-200 md:text-4xl'>
          {items[0].mainTitle}
          {/* Placeholder */}
        </h1>
        <p className='mt-6 font-serif text-lg font-light text-slate-400 md:text-2xl'>
          {items[0].description}
        </p>
        <div className='relative mt-32 flex h-20 w-full items-center justify-center'>
          <ChevronLeft
            size={40}
            onClick={prevSlide}
            className='[cursor: pointer] text-white'
          ></ChevronLeft>
          {/* Indicators */}
          <div className='ml-auto mr-auto flex gap-x-2'>{squareIndicators}</div>
          <ChevronRight
            className='text-white'
            onClick={nextSlide}
            size={40}
          ></ChevronRight>
        </div>
      </motion.div>

      <motion.div
        className='absolute left-[50%] top-[190px] ml-0 h-[400px] w-[960px]'
        initial={{ x: 80, scale: 0.9, opacity: 0 }} // Starts slightly scaled down and transparent
        animate={{
          x: 0,
          scale: 1, // Scales to normal size
          opacity: 1, // Fades in
        }}
        transition={{
          type: 'spring',
          stiffness: 150, // Stiffer spring for snappier movement
          damping: 25, // Slight bounce
          duration: 0.5, // Shorter duration for a quicker, sharper effect
          delay: 0.3, // Small delay to make it feel more staggered
        }}
      >
        <img
          className='object-cover transition-transform duration-500 hover:translate-x-[-75px]'
          src={items[0].src}
        ></img>
      </motion.div>
    </>
  )

  // className='focus-pic absolute left-[50%] top-[190px]'
}
