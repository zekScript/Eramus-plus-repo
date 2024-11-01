'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'

import { topNav } from '@/config/site'
import MainNav from './main-nav'
import MobileNav from './mobile-nav'
import { useEffect, useState } from 'react'

export function TopBar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 0)
    }

    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  // TODO set color of topbar to same as background light and dark so that tranparency works ( example: bg-[#FFFF] )
  return (
    <div className='fixed left-0 top-0 z-10 w-full bg-[#FAFAFA] bg-opacity-60 backdrop-blur-sm dark:bg-[#0e0e0e] dark:bg-opacity-50'>
      <div
        className={cn(
          'shadow-transition border-border duration-300',
          isScrolled ? 'shadow-lg' : ''
        )}
      >
        <div
          className={cn(
            'py-transition container flex duration-300',
            isScrolled ? 'py-1' : 'py-2'
          )}
        >
          <div className='flex w-full items-center justify-between gap-x-4 text-sm'>
            {/* LOGO */}
            <Link href='/'>
              <Icons.logo className='mr-3 w-40 cursor-pointer fill-primary pb-1' />
            </Link>
            <div className='flex flex-row-reverse gap-x-4 lg:flex-row'>
              {/* MAIN NAV */}
              <MainNav items={topNav.items} />
              {/* MOBILE NAV */}
              <MobileNav items={topNav.items} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
