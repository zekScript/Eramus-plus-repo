'use client'

import * as React from 'react'
import { useState } from 'react'
import { NavItem } from '@/types'
import Link from 'next/link'
import ModeToggle from './color-theme'
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";


interface MainNavProps {
  items?: NavItem[]
}



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainNav: React.FC<MainNavProps> = ({ items }) => {
  // const segment = useSelectedLayoutSegment()
  // console.log('🚀 ~ segment:', segment)
  let pathname = usePathname() || "/";
  const [animationProps, __] = useState({
    left: 0,
    width: 0,
  }); 
  
  
  return (
    <>
    <div className='hidden lg:flex'>
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
        <ModeToggle></ModeToggle>
    </>
);
}

export default MainNav
