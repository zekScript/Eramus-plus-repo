'use client'
import { motion } from 'framer-motion'

export default function FadeInContent() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className='text-3xl font-medium text-white md:text-5xl'>
          Hello To My World
        </h1>
      </motion.div>
    </>
  )
}
