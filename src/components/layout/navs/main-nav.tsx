'use client'

import * as React from 'react'
import { NavItem } from '@/types'
import Link from 'next/link'
import { topNav } from '@/config/site'


interface MainNavProps {
  items?: NavItem[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainNav: React.FC<MainNavProps> = ({ items }) => {
  // const segment = useSelectedLayoutSegment()
  // console.log('🚀 ~ segment:', segment)

  const itemsList = items?.map(item => <Link  
                                        key={item.title} 
                                        href={item.href}>
                                        {item.title}
                                        </Link>
                              )



          
        
  return (
    <>
    {/* This SHOULD BE HIDDEN BY DEFAULT*/}
    <div className='hidden lg:flex'>
      {/* MENU */}
      <div className='flex gap-12 mr-12' >
      {itemsList}
      </div>
    </div>
    </>
  )
}

export default MainNav
