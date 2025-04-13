'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'

import { topNav } from '@/config/site'
import MainNav from './main-nav'
import MobileNav from './mobile-nav'
import { useEffect, useState } from 'react'
import ThemeToggle from '@/components/theme-switch'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '../../../server/currentUser'
import UserNav from '@/components/userNav'


export function TopBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const isLoggedIn = Cookies.get('authToken') ? true : false

  

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
    // fixed: position
    <div className='fixed left-0 top-0 z-50 w-full bg-[#FAFAFA] bg-opacity-60 backdrop-blur-sm dark:bg-[#0e0e0e] dark:bg-opacity-50'>
      <div
        className={cn(
          'shadow-transition border-border duration-300',
          isScrolled ? 'shadow-lg' : ''
        )}
      >
        <div
          className={cn(
            'py-transition container flex w-full duration-300',
            isScrolled ? 'py-1' : 'py-2'
          )}
        >
          <div className='flex w-full justify-start'>
            {/* LOGO */}
            <Link href='/'>
              <Icons.logo className='w-40 cursor-pointer fill-primary pb-1' />
            </Link>
          </div>

          <div className='flex items-center justify-center gap-x-4 text-sm'>
            <div className='flex w-full justify-end'>
              {/* Main nav here */}
              <MainNav items={topNav.items} />
            </div>
            <div className='flex flex-row-reverse gap-x-4 lg:flex-row'>
              {/* MOBILE NAV */}
              <MobileNav items={topNav.items} />
            </div>
            {/* MAIN NAV */}
          </div>
          {!isLoggedIn ? (
            <div className='mb-4 mt-3 hidden w-full justify-end gap-x-4 lg:flex'>
              <Link href='/signin'>Sign in</Link>
              <Link href='/login'>Log in</Link>
            </div>
          ) : (
            <div className='mb-4 mt-3 hidden w-full justify-end gap-x-4 lg:flex'>
              <UserNav />
            </div>
          )}
        </div>
      </div>
      <div className='flex h-full w-full justify-end'>
        <div
          className={`mb-4 ml-8 mr-8 hidden w-full justify-end border-t-2 lg:flex`}
        >
          <div className='mt-5'>
            <ThemeToggle></ThemeToggle>
          </div>
        </div>
      </div>
    </div>
  )
}
