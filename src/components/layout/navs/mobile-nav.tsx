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
import { Headset, LogOut, Plus, Settings, User } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'

interface NavProps {
  items?: NavItem[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MobileNav: React.FC<NavProps> = ({ items }) => {
  const router = useRouter()
  const logout = () => {
    Cookies.remove('authToken')
    window.location.reload()
    router.push('/')
  }

  const isLoggedIn = Cookies.get('authToken') ? true : false
  const pathname = usePathname() || '/'

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
                      src='https://i.pinimg.com/564x/9f/e2/43/9fe24317d8363d84b3eb3b93b9c756ae.jpg'
                      alt='Profile avatar'
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  <DropdownMenuLabel>Admin</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User />
                      <span>Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <Settings />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Plus />
                      <span>Create</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Headset />
                    <span>Support</span>
                  </DropdownMenuItem>
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
