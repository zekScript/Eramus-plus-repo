import React from 'react'
import { motion } from 'framer-motion'

const Loader: React.FC = () => {
  return (
    <motion.div
      style={{
        width: '50px',
        aspectRatio: '1',
        borderRadius: '50%',
        background: `
          radial-gradient(farthest-side, #ffa516 94%, transparent) top/8px 8px no-repeat,
          conic-gradient(transparent 30%, #ffa516)
        `,
        WebkitMask:
          'radial-gradient(farthest-side, transparent calc(100% - 8px), black 0)',
      }}
      animate={{
        rotate: [0, 360], // rotate from 0 to 360 degrees
      }}
      transition={{
        repeat: Infinity, // loop infinitely
        duration: 1, // 1 second duration
        ease: 'linear', // linear easing
      }}
    />
  )
}

export default Loader
