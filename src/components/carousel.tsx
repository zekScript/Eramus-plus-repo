'use client'
import { useState } from 'react'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion";


const Carousel: React.FC = () => {
  // THERE SHOULD BE A CODE CLEANED AND STATIC TYPED IN

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1537211261771-e525b9e4049b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=450&q=80',
      alt: 'Squirrel zombie',
    },
    {
      src: 'https://images.unsplash.com/photo-1503925802536-c9451dcd87b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=450&q=80',
      alt: 'Zombie hands',
    },
    {
      src: 'https://images.unsplash.com/photo-1509558567730-6c838437b06b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=450&q=80',
      alt: 'Zombie pumpkin',
    },
  ]

  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  

  
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }



  return (
    <div className='relative mx-auto max-w-xl'>
      <div className='overflow-hidden'>
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`${
              idx === current ? 'block' : 'hidden'
            } transition-opacity duration-500`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className='h-auto w-full rounded-md'
            />
          </div>
        ))}
        
      </div>

      {/* Navigation Buttons */}
      <div className='absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-between px-4 hidden lg:flex'>
        <button
          onClick={prevSlide}
          className='arrow-big-left flex h-10 w-10 items-center justify-center rounded-full bg-white font-bold text-black shadow-lg'
        >
          <ArrowBigLeft></ArrowBigLeft>
        </button>
        <button
          onClick={nextSlide}
          className='arrow-big-right flex h-10 w-10 items-center justify-center rounded-full bg-white font-bold text-black shadow-lg'
        >
          <ArrowBigRight></ArrowBigRight>
        </button>
      </div>

      {/* Dots */}
      <div className='mt-4 flex justify-center space-x-2'>
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-3 w-3 rounded-full ${
              idx === current ? 'bg-teal-500' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default Carousel
