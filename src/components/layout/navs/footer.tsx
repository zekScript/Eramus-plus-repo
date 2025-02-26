import * as React from 'react'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { P, PMuted } from '@/components/typography'
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react'

type Props = {
  className?: string
}

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={cn(className, 'mt-12 space-y-10 pb-10')}>
      <div className='container'>
        <Separator orientation='horizontal' />
      </div>

      <div className='ml-7 mt-14 w-[40%]'>
        <h2 className='mb-7 text-xl font-bold'>
          Website designed by Armandas Latanauskas
        </h2>
        <p className='text-sm text-zinc-500'>
          Website was built with the help of CEO Jernej Ulbin from{' '}
          <a href='https://www.roundedsq.com/'>RoundedSQ</a>
        </p>
        <p className='text-sm text-zinc-500'>
          Coded with <a href='https://code.visualstudio.com/'>VS Code</a>, built
          with <a href='https://nextjs.org/'>Next.js</a>,{' '}
          <a href='https://tailwindcss.com/'>Tailwind CSS</a>, and{' '}
          <a href='https://ui.shadcn.com/'>shadcn</a>. This site is deployed
          with <a href='https://vercel.com/'>Varcel</a>
        </p>
        {/* Socials here */}
        <div className='mt-7 flex w-[35%] flex-row items-start gap-x-4 md:mt-4 md:items-center lg:flex-row'>
          <Link href='https://github.com/zekScript'>
            <Github />
          </Link>
          <Link href='https://www.linkedin.com/in/armandas-latanauskas-a61a3b2ab/'>
            <Linkedin></Linkedin>
          </Link>
          <Link href='https://www.instagram.com/zekjax/profilecard/?igsh=aW1hZnNkM2pyeGVw'>
            <Instagram />
          </Link>
          <Link href='https://x.com/armandzekas'>
            <Twitter></Twitter>
          </Link>
        </div>
      </div>

      <div className='container flex h-full flex-col items-end justify-between gap-1 md:flex-row md:items-center'>
        <Icons.logo className='w-40 fill-primary' />

        <div className='mt-1 flex flex-col items-start gap-x-4 md:mt-0 md:flex-row md:items-center'>
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
