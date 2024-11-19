'use client'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react';

export default function FadeInContent() {
  

  return (
    <>
      <motion.div className='overflow-hidden absolute right-[60%] mt-36'
        // initial={{ opacity: 0, scale: 0.95 }}
        // animate={{ opacity: 1, scale: 1 }}
        // transition={{ duration: 0.8, ease: 'easeOut' }}
        initial={{ opacity: 0, scale: 0.95, x: -100 }}  // Starts from the left (-100px on x-axis)
        animate={{ opacity: 1, scale: 1, x: 0 }}  // Ends in normal position
        transition={{ duration: 0.8, ease: 'easeOut' }}

      >

        <h1 className='text-lg font-bold text-slate-200 md:text-4xl'>
          Armandas Latanauskas
        </h1>
        <p className='md:text-2xl text-lg font-serif font-light text-slate-400 mt-6'>
        "Innovation starts with a single line of code."
        </p>
        <div className='relative w-full h-20 mt-32 flex justify-evenly items-center'>
        <ChevronLeft size={40}></ChevronLeft>
        {/* Indicators */}
        ________
        <ChevronRight size={40}></ChevronRight>
        </div>
      </motion.div>

      <motion.div
      
      className="w-[960px] h-[400px] ml-0 absolute left-[50%] top-[190px]"
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
      <img className='object-cover
                transition-transform duration-500 
                hover:translate-x-[-75px]'
                
                src="https://market.fp.ps.netease.com/file/6704da94f083126d846b2729h175EmYB05"></img>
      </motion.div>
    </>
  )

  // className='focus-pic absolute left-[50%] top-[190px]'
}
