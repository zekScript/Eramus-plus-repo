'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, MotionProps, motion } from 'framer-motion'

interface ContainerProps extends MotionProps {
  children: React.ReactNode
  className?: string
  customAnimation?: boolean
  delay?: number
  duration?: number
}

const Block = ({
  children,
  className,
  delay,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  duration,
  customAnimation = false,
  ...rest
}: ContainerProps) => {
  const combinedClassName = cn(className)

  const defaultAnimation: MotionProps = {
    initial: { opacity: 0, y: 100 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: {
      delay: delay ? delay : 0.1,
      // duration: duration ? duration : 0.7,
      type: 'spring',
      // stiffness: 100,
    },
    viewport: { once: true },
  }

  return (
    <AnimatePresence>
      <motion.div
        className={combinedClassName}
        {...(customAnimation ? rest : defaultAnimation)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
export default Block
