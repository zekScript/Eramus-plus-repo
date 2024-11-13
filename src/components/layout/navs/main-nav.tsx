'use client'

import * as React from 'react'
import { NavItem } from '@/types'
import Link from 'next/link'
import ModeToggle from './color-theme'

interface MainNavProps {
  items?: NavItem[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainNav: React.FC<MainNavProps> = ({ items }) => {
  // const segment = useSelectedLayoutSegment()
  // console.log('🚀 ~ segment:', segment)

  const itemsList = items?.map((item) => (
    <Link key={item.title} href={item.href}>
      {item.title}
    </Link>
  ))

  return (
    <>
      {/* This SHOULD BE HIDDEN BY DEFAULT*/}
      <div className='hidden lg:flex'>
        {/* MENU */}
        <div className='mr-3 flex items-center justify-center gap-6'>
          {itemsList}
        </div>
      </div>
      <ModeToggle></ModeToggle>
    </>
  )
}

export default MainNav
