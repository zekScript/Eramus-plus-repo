'use client'
import { getCurrentUser } from '@/server/currentUser'
import SideBarContent from './sidebarContent'
import { Button } from './ui/button'
import { useRouter, usePathname } from 'next/navigation'
import NavLink from '@/components/nav-link'
import { findUserById, updateUser } from '@/server/user'
import { useEffect, useState } from 'react'

interface UserProfile {
  name: string
  id: number
  password: string
  email: string
  accessAdmin: boolean | null
  createdAt: Date
  updatedAt: Date
  role: string
  followersCount: number
  followingCount: number
  postsCount: number
  profilePic: string | null
  bio: string | null
}
export default function SideBar() {
  const [profileSettingsCurrentUser, setProfileSettingsCurrentUser] =
    useState<UserProfile | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const settingsID = pathname.split('/').pop()
  const segments = pathname.split('/')
  const userId = parseInt(segments[2], 10)

  useEffect(() => {
    findUserById(userId)
      .then((user) => {
        return setProfileSettingsCurrentUser(user) // Store resolved value in state
      })
      .catch((error) => {
        console.error('Error fetching user:', error)
      })
  }, [userId])

  return (
    <>
      <div className='flex w-full justify-end text-sm'>
        <Button
          variant='link'
          onClick={() =>
            router.push(`/profiles/${profileSettingsCurrentUser?.id}`)
          }
        >
          Back To Your Profile
        </Button>
      </div>
      {/* <div className='mt-2 flex h-full bg-red-500 w-full justify-start'>
      </div> */}
      <div className='flex'>
        <div className='flex w-[250px] flex-col'>
          {/* Settings */}
          <NavLink
            navigateTo={`/profiles/${profileSettingsCurrentUser?.id}/settings/general`}
            exact
            scroll={false}
            className='flex justify-start rounded-full px-3 py-1.5 text-slate-500 hover:text-indigo-500 [&.active]:bg-gradient-to-l [&.active]:from-transparent [&.active]:to-[#3d4450] [&.active]:bg-[length:200%_100%] [&.active]:bg-[position:100%_0] [&.active]:text-indigo-600'
          >
            General
          </NavLink>

          {/* <NavLink
            navigateTo={`/profiles/${user?.id}/settings/avatar`}
            exact
            scroll={false}
            className='flex justify-start rounded-full px-3 py-1.5 text-slate-500 hover:text-indigo-500 [&.active]:bg-gradient-to-l [&.active]:from-transparent [&.active]:to-[#3d4450] [&.active]:bg-[length:200%_100%] [&.active]:bg-[position:100%_0] [&.active]:text-indigo-600'
          >
            Avatar
          </NavLink> */}
          {/* <NavLink
            navigateTo={`/profiles/${user?.id}/settings/profilebackground`}
            exact
            scroll={false}
            className='flex justify-start rounded-full px-3 py-1.5 text-slate-500 hover:text-indigo-500 [&.active]:bg-gradient-to-l [&.active]:from-transparent [&.active]:to-[#3d4450] [&.active]:bg-[length:200%_100%] [&.active]:bg-[position:100%_0] [&.active]:text-indigo-600'
          >
            Profile Background
          </NavLink> */}
          <NavLink
            navigateTo={`/profiles/${profileSettingsCurrentUser?.id}/settings/theme`}
            exact
            scroll={false}
            className='flex justify-start rounded-full px-3 py-1.5 text-slate-500 hover:text-indigo-500 [&.active]:bg-gradient-to-l [&.active]:from-transparent [&.active]:to-[#3d4450] [&.active]:bg-[length:200%_100%] [&.active]:bg-[position:100%_0] [&.active]:text-indigo-600'
          >
            Theme
          </NavLink>
          <NavLink
            navigateTo={`/profiles/${profileSettingsCurrentUser?.id}/settings/privacy`}
            exact
            scroll={false}
            className='flex justify-start rounded-full px-3 py-1.5 text-slate-500 hover:text-indigo-500 [&.active]:bg-gradient-to-l [&.active]:from-transparent [&.active]:to-[#3d4450] [&.active]:bg-[length:200%_100%] [&.active]:bg-[position:100%_0] [&.active]:text-indigo-600'
          >
            Privacy Settings
          </NavLink>
        </div>

        <SideBarContent params={{ settingsID: settingsID as string }} />
      </div>
    </>
  )
}
