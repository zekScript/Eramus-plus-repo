'use client'

import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { NavItem } from '@/types'
import Link from 'next/link'
import { Icons } from '@/components/icons'
import ModeToggle from './color-theme'

interface NavProps {
  items?: NavItem[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MobileNav: React.FC<NavProps> = ({ items }) => {
  const itemsList = items?.map((item) => (
    <Link key={item.title} href={item.href}>
      {item.title}
    </Link>
  ))

  return (
    <div className='flex items-center lg:hidden'>
      <Sheet>
        <SheetTrigger aria-controls={'mobile-nav'}>
          <Menu />
        </SheetTrigger>
        <SheetContent side='left' className='w-2/5'>
          <Link href='/'>
            <Icons.logo className='w-40 cursor-pointer fill-primary pb-6' />
          </Link>
          {/* MENU Items */}
          <div className='flex w-14 flex-col gap-y-4 text-xl font-bold'>
            {itemsList}
          </div>
          <div className='flex h-[75%] w-full items-end justify-end'>
            <ModeToggle></ModeToggle>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav
