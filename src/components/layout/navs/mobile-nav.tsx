'use client'

import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { NavItem } from '@/types'
import Link from 'next/link'
import { Icons } from '@/components/icons'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/theme-switch'

interface NavProps {
  items?: NavItem[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MobileNav: React.FC<NavProps> = ({ items }) => {
  // const itemsList = items?.map((item) => (
  //   <Link key={item.title} href={item.href}>
  //     {item.title}
  //   </Link>
  // ))
  const pathname = usePathname() || '/'

  return (
    <div className='flex items-center lg:hidden'>
      <Sheet>
        <SheetTrigger aria-controls={'mobile-nav'}>
          <Menu />
        </SheetTrigger>
        <SheetContent side='left' className='w-3/5'>
          <Link href='/'>
            <Icons.logo className='w-40 cursor-pointer fill-primary pb-6' />
          </Link>
          {/* MENU Items */}
          <div className='flex w-14 flex-col gap-y-4 text-xl font-bold'>
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
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </div>
          <div className='mt-4'>
            <ThemeToggle></ThemeToggle>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav
