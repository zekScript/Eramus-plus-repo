'use client'
import SideBar from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { findUserById } from '@/server/user'
import { getCurrentUser } from '@/server/currentUser'
import { UserItems } from '@/types'

export default function SettingsPage() {
  const router = useRouter()
  const currentUser = getCurrentUser()
  const pathname = usePathname()
  const segments = pathname.split('/')
  const userId = parseInt(segments[2], 10)
  const [profileSettingsCurrentUser, setProfileSettingsCurrentUser] =
    useState<UserItems | null>(null)

  useEffect(() => {
    findUserById(userId)
      .then((user) => {
        return setProfileSettingsCurrentUser(user) // Store resolved value in state
      })
      .catch((error) => {
        console.error('Error fetching user:', error)
      })
  }, [userId])

  

  useEffect(() => {
    // Redirect to /general if the current path doesn't include these routers
    if (
      !(
        pathname.includes('/general') ||
        pathname.includes('/theme') ||
        pathname.includes('/profilebackground') ||
        pathname.includes('/avatar') ||
        pathname.includes('/profilebackground') ||
        pathname.includes('/privacy')
      )
    ) {
      router.push(`/profiles/${currentUser?.id}/settings/general`)
    }
  }, [pathname, router])

  if (
    profileSettingsCurrentUser &&
    currentUser &&
    profileSettingsCurrentUser.id !== currentUser.id
  ) {
    router.push(`/profiles/${currentUser.id}/settings/general`)
    console.log('Redirecting unauthorized user...')
  }

  return (
    <>
      <div className='m-auto h-full w-full sm:w-[70%] justify-center '>
        <div className='flex h-full w-full'>
          {/* Avatar */}
          <div className='mb-4 ml-4 mr-6 mt-4 flex'>
            <img
              src={profileSettingsCurrentUser?.profilePic as string}
              width={128}
              height={128}
              onClick={() => router.push(`/profiles/${profileSettingsCurrentUser?.id}`)}
              className="w-[128px] h-[128px] sm:w-[184px] sm:h-[184px] cursor-pointer"
              alt='Avatar'
            ></img>
            {/* User Details */}
            <div className='ml-8 flex h-full items-center '>
              <Button
                variant='link'
                onClick={() => {
                  router.push(`/profiles/${profileSettingsCurrentUser?.id}`)
                }}
                className='text-2xl font-medium'
              >
                {profileSettingsCurrentUser?.name}
              </Button>
              /
              <Button
                className='flex h-full items-center text-sm font-normal'
                variant='link'
                onClick={() =>
                  router.push(
                    `/profiles/${profileSettingsCurrentUser?.id}/settings/general`
                  )
                }
              >
                Edit profile
              </Button>
              
              
            </div>
          </div>
        </div>
        {/* Sidebar and content */}
        <SideBar></SideBar>
      </div>
    </>
  )
}
