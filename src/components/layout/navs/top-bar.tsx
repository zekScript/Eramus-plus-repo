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
import { motion } from 'framer-motion'
import { getCurrentUser } from '../../../server/currentUser'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Headset,
  LogOut,
  Plus,
  User,
  Share2,
  Copy,
  Check,
  LayoutDashboard,
  Cog,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useParams } from 'next/navigation'

export function TopBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [copied, setCopied] = useState(false)
  const [email] = useState(
    'https://erasmus-plus-project-git-armandascode-zekscripts-projects.vercel.app/'
  )
  const router = useRouter()
  const isLoggedIn = Cookies.get('authToken') ? true : false
  const user = getCurrentUser()

  const logout = () => {
    Cookies.remove('authToken')
    window.location.reload()
    router.push('/')
  }

  function getFirstLettersForFallback(str: String) {
    if (!str) return ''
    return str
      .split(' ') // Split the string into an array of words
      .map((word) => word.charAt(0).toUpperCase()) // Take the first letter of each word and capitalize it
      .join('') // Combine the letters without spaces
  }

  const handleCopy = (event: React.MouseEvent) => {
    event.preventDefault() // Prevent the dropdown from closing
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1000) // Reset the icon after 2 seconds
    })
  }

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage
                      src='https://i.pinimg.com/564x/9f/e2/43/9fe24317d8363d84b3eb3b93b9c756ae.jpg'
                      alt='Profile avatar'
                    />
                    <AvatarFallback>
                      {getFirstLettersForFallback(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => router.push(`/profiles/${user?.id}`)}
                    >
                      <User />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/create')}>
                      <Plus />
                      <span>Create</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/support')}>
                    <Headset />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Share2 />
                      <span>Share</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuItem onClick={() => router.push(`/profiles/${user?.id}/settings/general`)}>
                      <Cog />
                      <span>Edit Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem
                          className='flex items-center gap-2'
                          onSelect={(event) => event.preventDefault()} // Prevent default dropdown closing behavior
                        >
                          <input
                            type='text'
                            readOnly
                            value={email}
                            className='rounded-md border border-gray-300 px-2 py-1 text-sm'
                          />
                          <motion.button
                            onClick={handleCopy}
                            aria-label='Copy to clipboard'
                            className='text-gray-500'
                            initial={{ opacity: 0 }} // Initial state
                            animate={{ opacity: 1 }} // Animate to full opacity
                            transition={{ duration: 0.3 }} // Duration of the animation
                          >
                            <motion.div
                              key={copied ? 'check' : 'copy'} // Animate between icons
                              initial={{ scale: 0 }} // Initial scale for icon animation
                              animate={{ scale: 1 }} // Animate to full size
                              exit={{ scale: 0 }} // Exit animation
                              transition={{ ease: 'easeInOut', duration: 0.2 }} // Smooth, no bobbing
                            >
                              {copied ? (
                                <Check size={16} />
                              ) : (
                                <Copy size={16} />
                              )}
                            </motion.div>
                          </motion.button>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={logout}>
                    <LogOut />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
      <div className='flex h-full w-full justify-end'>
        <div className='mb-4 ml-8 mr-8 hidden w-full justify-end border-t-2 border-indigo-500 lg:flex'>
          <div className='mt-5'>
            <ThemeToggle></ThemeToggle>
          </div>
        </div>
      </div>
    </div>
  )
}
