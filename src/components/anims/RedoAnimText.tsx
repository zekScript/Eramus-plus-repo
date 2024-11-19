'use client'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'

export interface IRedoAnimTextProps {
  delay: number
}

export default function RedoAnimText({ delay }: IRedoAnimTextProps) {
  const textIndex = useMotionValue(0)
  const texts = ["I'm Armandas, a passionate web developer with a passion for creating sleek and efficient websites. My journey in coding started when I applied to be a programming student I was fascinated turning ideas into reality through code. With expertise in HTML, CSS, JavaScript, and frameworks like React, Next.js, Tailwind, and other tools like shadcn, Auth.js. I enjoy crafting user-friendly and visually appealing web applications. "]
  // const texts = [
  //   "Ehhhh... hello i guess, I'm Armandas if you didn't know. I'm not very social so bare with me. I'm a frontend developer that likes to play video games and buy virtual items, but if you didn't know I know abit of Next.js and tailwind, Oh better yet I know also abit React and I know shadcn, Auth.js, Prisma(Not really), and other cool tools. I'm a newbie of being a developer or programming in general but me and Rounded square is helping to be in their internship temporarly, and being a better programmer and getting used to programming environment, I hope you pick me :)",
  // ]

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
