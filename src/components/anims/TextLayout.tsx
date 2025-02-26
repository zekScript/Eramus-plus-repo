'use client'
import { motion } from 'framer-motion'
import AnimText from './AnimText'

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

export default function A4Animation() {
  return (
    <motion.div className='md: flex h-full select-none'>
      <motion.div
        variants={containerVariants}
        animate='visible'
        // initial='hidden'
        className='flex h-full w-full flex-col p-2'
      >
        <motion.div
          variants={itemVariants}
          className='flex items-center space-x-2'
        ></motion.div>
        <motion.div
          variants={itemVariants}
          className='flex items-center justify-center'
        ></motion.div>
        <motion.span
          variants={itemVariants}
          className='inline w-[70%] text-sm md:w-full md:text-lg'
        >
          <AnimText delay={1} />
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
