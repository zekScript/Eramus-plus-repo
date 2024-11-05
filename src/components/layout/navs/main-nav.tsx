'use client'

import * as React from 'react'
import { NavItem } from '@/types'
import SignIn from './sign-in'
import Link from 'next/link'
import { topNav } from '@/config/site'


interface MainNavProps {
  items?: NavItem[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainNav: React.FC<MainNavProps> = ({ items }) => {
  // const segment = useSelectedLayoutSegment()
  // console.log('🚀 ~ segment:', segment)

  const topNavItems = topNav.items[0].title;
  const itemsList = items?.map(item => <Link  
                                        key={item.title} 
                                        href={item.href}>
                                        {item.title}
                                        </Link>
                              )

          

      

  return (
    <>
    {/* This SHOULD BE HIDDEN */}
    <div className='hidden lg:flex'>
      {/* MENU */}
      <div className='flex gap-12 mr-12' >
      {itemsList}
      </div>
    </div>
  {/* <div className=' w-full'>
      <div className="w-auto flex gap-6 text-end ">
      <Link href='/log-account'>Log in</Link>
      <SignIn></SignIn>
      </div>
  </div> */}
    </>
  )
}

export default MainNav
