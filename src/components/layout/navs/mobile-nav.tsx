'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { NavItem } from '@/types'
import Link from 'next/link'
import { Icons } from '@/components/icons'

interface NavProps {
  items?: NavItem[]
}

import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MobileNav: React.FC<NavProps> = ({ items }) => {
  return (
    <div className='flex items-center lg:hidden'>
      <Sheet>
        <SheetTrigger aria-controls={'mobile-nav'}>
          <Menu />
        </SheetTrigger>
        <SheetContent side='left' className='w-11/12'>
          <Link href='/'>
            <Icons.logo className='w-40 cursor-pointer fill-primary pb-6' />
          </Link>
          {/* MENU Items */}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav
