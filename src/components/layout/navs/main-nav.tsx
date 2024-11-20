'use client'

import * as React from 'react'
import { NavItem } from '@/types'
import Link from 'next/link'
import ModeToggle from './color-theme'
import { usePathname } from 'next/navigation'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

interface MainNavProps {
  items?: NavItem[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainNav: React.FC<MainNavProps> = ({ items }) => {
  // const segment = useSelectedLayoutSegment()
  // console.log('🚀 ~ segment:', segment)
  const pathname = usePathname() || '/'

  return (
    <>
      <div className='hidden w-full lg:flex'>
        {items?.map((item) => {
          const isActive = item.href === pathname
          return (
            <Link
              key={item.href}
              className={`relative inline-flex rounded-full px-3 py-1.5 text-sm font-bold text-slate-500 no-underline duration-300 ease-in hover:text-indigo-500 lg:text-base [&.active]:text-indigo-600 ${
                isActive ? 'active' : ''
              }`}
              href={item.href}
            >
              <span>{item.title} </span>
            </Link>
            
          )
        })}

      <HoverCard>
        <HoverCardTrigger asChild>
          <Link href='/'>Projects</Link>
        </HoverCardTrigger>
        <HoverCardContent className='w-80'>
          <div className='flex justify-between space-x-4'>
            <div className='space-y-1'>
              <h4 className='text-sm font-semibold'>@nextjs</h4>
              <p className='text-sm'>
                The React Framework – created and maintained by @vercel.
              </p>
              <div className='flex items-center pt-2'>
                <span className='text-xs text-muted-foreground'>
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      </div>
      <ModeToggle></ModeToggle>
      
    </>
  )
}

export default MainNav
