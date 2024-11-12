import * as React from 'react'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { P, PMuted } from '@/components/typography'

type Props = {
  className?: string
}

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={cn(className, 'space-y-10 pb-10 mt-12')}>
      <div className='container'>
        <Separator orientation='horizontal' />
      </div>
      <div className='container flex flex-col items-start justify-between gap-1 md:flex-row md:items-center'>
        <Icons.logo className='w-40 fill-primary' />
        <div className='mt-4 flex flex-col items-start gap-x-4 md:mt-0 md:flex-row md:items-center'>
          <div className='mt-1 flex flex-col items-start gap-x-4 md:flex-row md:items-center'>
            <PMuted>Copyright © 2023 Rounded SQ.</PMuted>
            <PMuted>All rights reserved.</PMuted>
          </div>
          <div className='mt-6 flex h-5 items-center space-x-4 md:ms-2 md:mt-0 md:space-x-2'>
            <P className='hover:text-primary/60 underline'>
              <Link href='/info/politika-zasebnosti'>Privacy</Link>
            </P>
            <Separator orientation='vertical' />
            <P className='hover:text-primary/60 underline'>
              <Link href='/info/piskotki'>Cookies</Link>
            </P>
            <Separator orientation='vertical' />
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
