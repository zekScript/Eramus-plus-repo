'use client'
import { motion } from 'framer-motion'

export default function TextFadeIn() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className='mb-20 ml-12 flex flex-row'>
          <h1 className='w-12 text-7xl font-medium md:text-8xl'>
            Hello To My World
          </h1>
        </div>
      </motion.div>
    </>
  )
}
