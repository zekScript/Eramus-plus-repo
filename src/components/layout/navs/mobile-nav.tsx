'use client'

import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { NavItem } from '@/types'
import Link from 'next/link'
import { Icons } from '@/components/icons'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/theme-switch'
import Cookies from 'js-cookie'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Headset,
  LogOut,
  Plus,
  Settings,
  User,
  Database,
  BarChartIcon,
  Share2,
  Cog,
  Check,
  Copy,
} from 'lucide-react'
import { useEffect, useState } from 'react'

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
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/server/currentUser'

interface NavProps {
  items?: NavItem[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MobileNav: React.FC<NavProps> = ({ items }) => {
  const user = getCurrentUser()
  const [isScrolled, setIsScrolled] = useState(false)
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const logout = () => {
    Cookies.remove('authToken')
    window.location.reload()
    router.push('/')
  }

  const isLoggedIn = Cookies.get('authToken') ? true : false
  const pathname = usePathname() || '/'
  const [address] = useState(
    'https://erasmus-plus-project-git-armandascode-zekscripts-projects.vercel.app/'
  )

  function getFirstLettersForFallback(str?: string) {
    if (!str) return ''
    return str
      .split(' ') // Split the string into an array of words
      .map((word) => word.charAt(0).toUpperCase()) // Take the first letter of each word and capitalize it
      .join('') // Combine the letters without spaces
  }

  const handleCopy = (event: React.MouseEvent) => {
    event.preventDefault() // Prevent the dropdown from closing
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1000) // Reset the icon after 2 seconds
    })
  }

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
          {!isLoggedIn ? (
            <div className='mt-12 gap-x-8'>
              <Link href='/signin'>Sign in</Link>
              <Link href='/login'>Log in</Link>
            </div>
          ) : (
            <div className='mt-12 gap-x-4'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage
                      src={user?.profilePic}
                      alt='Profile avatar'
                    />
                    <AvatarFallback>
                      {getFirstLettersForFallback(user?.name ?? '')}
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
                    <DropdownMenuItem
                      onClick={() => router.push('/my-account/stats')}
                    >
                      <BarChartIcon />
                      <span>Stats</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(`/profiles/${user?.id}/create`)
                      }
                    >
                      <Plus />
                      <span>Create</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(`/profiles/${user?.id}/all-posts`)
                      }
                    >
                      <Database />
                      <span>My posts</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push(`/profiles/${user?.id}/support`)}
                  >
                    <Headset />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Share2 />
                      <span>Share</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(`/profiles/${user?.id}/settings/general`)
                      }
                    >
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
                            value={address}
                            className='rounded-md border border-gray-300 px-2 py-1 text-sm'
                          />
                          <button
                            onClick={handleCopy}
                            aria-label='Copy to clipboard'
                          >
                            <div key={copied ? 'check' : 'copy'}>
                              {copied ? (
                                <Check size={16} />
                              ) : (
                                <Copy size={16} />
                              )}
                            </div>
                          </button>
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
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav
