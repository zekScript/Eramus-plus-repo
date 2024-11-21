'use client'

import * as React from 'react'
import { NavItem } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/theme-switch'

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
      </div>
      <div className='hidden w-full justify-end lg:flex'>
        <ThemeToggle></ThemeToggle>
      </div>
    </>
  )
}

export default MainNav
