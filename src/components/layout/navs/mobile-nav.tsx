'use client'

import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { NavItem } from '@/types'
import Link from 'next/link'
import { Icons } from '@/components/icons'
import ModeToggle from './color-theme'
import { usePathname } from "next/navigation";
import { motion } from 'framer-motion'
import { useState } from 'react'

interface NavProps {
  items?: NavItem[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MobileNav: React.FC<NavProps> = ({ items }) => {
  
  
  // const itemsList = items?.map((item) => (
  //   <Link key={item.title} href={item.href}>
  //     {item.title}
  //   </Link>
  // ))
  let pathname = usePathname() || "/";
  const [animationProps, __] = useState({
    left: 0,
    width: 0,
  }); 


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


            {items?.map((item, __) => {

            const isActive = item.href === pathname;
            <motion.div 
              className="absolute left-0 inset-y-0 bg-indigo-100"
              aria-hidden="true"
              animate={{
                ...animationProps,
              }}
              transition={{ type: "spring", duration: 0.5 }}
            ></motion.div>
          
            return (
            
            <Link
              key={item.href}
              className={`font-bold inline-flex rounded-full px-3 py-1.5 text-slate-500 hover:text-indigo-500 [&.active]:text-indigo-600 text-sm lg:text-base relative no-underline duration-300 ease-in ${
                isActive ? "active" : ""
              }`}

              href={item.href}
            >
              <span>{item.title}</span>
            </Link>
          );
  }
        
)}
          </div>
          <div className='flex h-[65%] w-full items-end justify-end'>
            <ModeToggle></ModeToggle>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav
