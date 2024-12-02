'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, checked, children, ...props }, ref) => {
  return (
    <SwitchPrimitives.Root
      className={cn(
        `peer inline-flex h-8 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
        className
      )}
      style={{
        backgroundColor: checked ? '#1a202c' : '#f7fafc', // Change dynamically for dark/light mode
      }}
      {...props}
      ref={ref}
    >
      <motion.div
        className='pointer-events-none flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-lg ring-0'
        initial={false} // Prevent Framer Motion from applying an initial state mismatch
        animate={{ x: checked ? 32 : 0 }} // Smoothly transition based on `checked`
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
