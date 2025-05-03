'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Headset,
  LogOut,
  Plus,
  User,
  Share2,
  Copy,
  Check,
  Cog,
  Database,
} from 'lucide-react'

import { useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/server/currentUser'

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

const UserNav: React.FC = () => {
  const [copied, setCopied] = useState(false)
  const [address] = useState(
    'https://erasmus-plus-project-git-armandascode-zekscripts-projects.vercel.app/'
  )
  const router = useRouter()
  const user = getCurrentUser()

  const logout = () => {
    Cookies.remove('authToken')
    window.location.reload()
  }

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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='cursor-pointer'>
            <AvatarImage
              src={user?.profilePic ?? undefined}
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
              onClick={() => router.push(`/profiles/${user?.id}/create`)}
            >
              <Plus />
              <span>Create</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`/profiles/${user?.id}/all-posts`)}
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
                  <button onClick={handleCopy} aria-label='Copy to clipboard'>
                    <div key={copied ? 'check' : 'copy'}>
                      {copied ? <Check size={16} /> : <Copy size={16} />}
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
    </>
  )
}

export default UserNav
