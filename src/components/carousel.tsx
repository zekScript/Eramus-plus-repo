'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCarousel() {
  const items = [
    { image: 'https://via.placeholder.com/300x200' },
    { image: 'https://via.placeholder.com/300x200' },
    { image: 'https://via.placeholder.com/300x200' },
    { image: 'https://via.placeholder.com/300x200' },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [_, setDragging] = useState(false)

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className='relative mx-auto w-full max-w-4xl overflow-hidden'>
      {/* Carousel Items (Whole Carousel is Draggable) */}
      <motion.div
        className='flex'
        animate={{
          x: `-${currentIndex * 100}%`,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
        drag='x' // Enable horizontal dragging
        dragConstraints={{ left: -(items.length - 1) * 100, right: 0 }} // Restrict dragging within carousel bounds
        onDragStart={() => setDragging(true)} // Set dragging state to true when dragging starts
        onDragEnd={(e, info) => {
          // When drag ends, adjust current index based on the drag distance
          if (info.offset.x < -100) {
            nextSlide()
          } else if (info.offset.x > 100) {
            prevSlide()
          }
          setDragging(false) // Reset dragging state
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className='w-full flex-shrink-0'
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <div className='relative h-64'>
              <img
                src={item.image}
                className='h-full w-full rounded-lg object-cover shadow-lg transition-transform duration-300'
              />
              <motion.div
                className='absolute bottom-0 h-full w-full'
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation Arrows (Hide on Mobile) */}
      <button
        onClick={prevSlide}
        className='absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-black bg-opacity-50 px-4 py-2 text-white hover:bg-opacity-75 md:block'
      >
        &#8249;
      </button>
      <button
        onClick={nextSlide}
        className='absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-black bg-opacity-50 px-4 py-2 text-white hover:bg-opacity-75 md:block'
      >
        &#8250;
      </button>

      {/* Pagination Dots */}
      <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2'>
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-gray-500'
            }`}
          ></button>
        ))}
      </div>
    </div>
  )
}
