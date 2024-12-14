'use client'
import { getCurrentUser } from '@/server/currentUser'
import SideBarContent from './sidebarContent'
import { Button } from './ui/button'
import { useRouter, usePathname } from 'next/navigation'
import NavLink from '@/components/nav-link'

export default function SideBar() {
  const router = useRouter()
  const pathname = usePathname()
  const settingsID = pathname.split('/').pop()

  const user = getCurrentUser()
  return (
    <>
      <div className='flex w-full justify-end text-sm'>
        <Button
          variant='link'
          onClick={() => router.push(`/profiles/${user?.id}`)}
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
            navigateTo={`/profiles/${user?.id}/settings/general`}
            exact
            scroll={false}
            className='flex justify-start rounded-full px-3 py-1.5 text-slate-500 hover:text-indigo-500 [&.active]:bg-gradient-to-l [&.active]:from-transparent [&.active]:to-[#3d4450] [&.active]:bg-[length:200%_100%] [&.active]:bg-[position:100%_0] [&.active]:text-indigo-600'
          >
            General
          </NavLink>

          <NavLink
            navigateTo={`/profiles/${user?.id}/settings/avatar`}
            exact
            scroll={false}
            className='flex justify-start rounded-full px-3 py-1.5 text-slate-500 hover:text-indigo-500 [&.active]:bg-gradient-to-l [&.active]:from-transparent [&.active]:to-[#3d4450] [&.active]:bg-[length:200%_100%] [&.active]:bg-[position:100%_0] [&.active]:text-indigo-600'
          >
            Avatar
          </NavLink>
          <NavLink
            navigateTo={`/profiles/${user?.id}/settings/profilebackground`}
            exact
            scroll={false}
            className='flex justify-start rounded-full px-3 py-1.5 text-slate-500 hover:text-indigo-500 [&.active]:bg-gradient-to-l [&.active]:from-transparent [&.active]:to-[#3d4450] [&.active]:bg-[length:200%_100%] [&.active]:bg-[position:100%_0] [&.active]:text-indigo-600'
          >
            Profile Background
          </NavLink>
          <NavLink
            navigateTo={`/profiles/${user?.id}/settings/theme`}
            exact
            scroll={false}
            className='flex justify-start rounded-full px-3 py-1.5 text-slate-500 hover:text-indigo-500 [&.active]:bg-gradient-to-l [&.active]:from-transparent [&.active]:to-[#3d4450] [&.active]:bg-[length:200%_100%] [&.active]:bg-[position:100%_0] [&.active]:text-indigo-600'
          >
            Theme
          </NavLink>
          <NavLink
            navigateTo={`/profiles/${user?.id}/settings/privacy`}
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
