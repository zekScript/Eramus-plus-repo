'use client'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'

export interface IRedoAnimTextProps {
  delay: number
}

export default function RedoAnimText({ delay }: IRedoAnimTextProps) {
  const textIndex = useMotionValue(0)
  const texts = [
    "I'm reaching out to express my interest in joining your team.",
    "I'm excited about the opportunity to bring my skills to your company.",
    "I'd love to discuss how my experience aligns with your needs.",
    'I believe my background makes me a great fit for this role.',
    "I'm eager to contribute my expertise and passion for [industry] at [company].",
    "I'm drawn to this role as it aligns well with my skills and career goals.",
    'After reviewing the job description, I’m excited to apply for this position.',
    'I’m motivated to bring my skills to a team like yours.',
    'I am writing to you because I want a job.',
    'I am the best candidate for this job.',
    'In my grand adventure as a seasoned designer...',
    "Knock knock! Who's there? Your new employee!",
    'Walking the tightrope balance of project management...',
    'I find myself compelled to express my interest due to...',
    'My pen (or should I say, keyboard) is at work today because...',
    'Inspired by the alluring challenge in the job posting, I am writing...',
    'Stirred to my keyboard by the tantalizing nature of the role…',
  ]

  const baseText = useTransform(textIndex, (latest) => texts[latest] || '')
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest)
  )
  const updatedThisRound = useMotionValue(true)

  useEffect(() => {
    animate(count, 60, {
      type: 'tween',
      delay: delay,
      duration: 2,
      ease: 'easeIn',
      repeat: Infinity,
      repeatType: 'reverse',
      repeatDelay: 2,
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
