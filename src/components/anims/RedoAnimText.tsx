'use client'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'

export interface IRedoAnimTextProps {
  delay: number
}

export default function RedoAnimText({ delay }: IRedoAnimTextProps) {
  const textIndex = useMotionValue(0)
  const texts = ["I'm Armandas, a passionate web developer with a passion for creating sleek and efficient websites. My journey in coding started when I applied to be a programming student I was fascinated turning ideas into reality through code. With expertise in HTML, CSS, JavaScript, and frameworks like React, Next.js, Tailwind, and other tools like shadcn, Auth.js. I enjoy crafting user-friendly and visually appealing web applications. "]
  

  const baseText = useTransform(textIndex, (latest) => texts[latest] || '')
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest)
  )
  const updatedThisRound = useMotionValue(true)

  useEffect(() => {
    animate(count, 550, {
      type: 'tween',
      delay: 5,
      duration: 15,
      ease: 'easeIn',
      onUpdate(latest) {
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false)
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0)
          } else {
            textIndex.set(textIndex.get() + 1)
          }
          updatedThisRound.set(true)
        }
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <motion.span className='inline'>{displayText}</motion.span>
}
