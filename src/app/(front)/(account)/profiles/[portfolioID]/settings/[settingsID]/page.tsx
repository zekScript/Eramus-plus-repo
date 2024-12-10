'use client'
import SideBar from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/server/currentUser'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
export default function SettingsPage() {
  const pathname = usePathname()
  const router = useRouter()
  const user = getCurrentUser()

  useEffect(() => {
    // Redirect to /general if the current path doesn't include '/general'
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
      router.push(`/profiles/${user?.id}/settings/general`)
    }
  }, [pathname, router])

  return (
    <>
      <div className='m-auto h-full w-[60%] justify-center'>
        <div className='flex h-full w-full'>
          {/* Avatar */}
          <div className='mb-4 ml-4 mr-6 mt-4 flex'>
            <img
              src={user?.profilePic as string}
              width={128}
              height={128}
              // className="w-[184px] h-[184px]"
              alt='Avatar'
            ></img>
            {/* User Details */}
            <div className='ml-8 flex h-full items-center '>
              <Button
                variant='link'
                onClick={() => {
                  router.push(`/profiles/${user?.id}`)
                }}
                className='text-2xl font-medium'
              >
                {user?.name}
              </Button>
              /
              <Button
                className='flex h-full items-center text-sm font-normal'
                variant='link'
                onClick={() =>
                  router.push(`/profiles/${user?.id}/settings/general`)
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
