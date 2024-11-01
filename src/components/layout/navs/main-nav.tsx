'use client'

import * as React from 'react'

import { NavItem } from '@/types'

import Link from 'next/link'

interface MainNavProps {
  items?: NavItem[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainNav: React.FC<MainNavProps> = ({ items }) => {
  // const segment = useSelectedLayoutSegment()
  // console.log('🚀 ~ segment:', segment)

  return (
    <div className='hidden lg:flex'>
      {/* MENU */}
      <div>
        <Link href='/'>Home</Link>
      </div>
    </div>
  )
}

export default MainNav
