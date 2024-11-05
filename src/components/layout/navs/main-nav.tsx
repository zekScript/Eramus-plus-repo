'use client'

import * as React from 'react'

import { NavItem } from '@/types'
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ButtonWithIcon() {
  return (
    <>
    <Button>
      <Mail /> Login with Email
    </Button>
    </>
  )
}


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
        <Link href='/create'>Create</Link>
      </div>
    </div>
  )
}

export default MainNav
