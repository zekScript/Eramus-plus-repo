"use client"
import SideBar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/server/currentUser"
import { useRouter } from "next/navigation";
export default function SettingsPage(){
      const router = useRouter()
      const user = getCurrentUser();

      return(
            <>
            <div className='m-auto h-full w-[90%] justify-center'>
      <div className='flex h-full w-full'>
        {/* Avatar */}
        <div className='mb-4 ml-4 mr-6 mt-4 flex'>
          <img
            src='https://64.media.tumblr.com/f730251d3c0303bb13b5bc0680509450/8c18ff4361c6cbaf-93/s250x400/7b4ce54250ffac371a19090e842b0a1ebcf48911.jpg'
            width={184}
            height={184}
            className="w-[184px] h-[184px]"
            alt='Avatar'
          />
          {/* User Details */}
          <div className='ml-8 h-full flex items-center'>
            <Button variant="link" onClick={() => {
                  router.push(`/profiles/${user?.id}`)
                }}
                className='text-2xl font-medium'>
             {user?.name}
             </Button>
             /
             <Button className="h-full flex items-center text-sm font-normal" variant="link" onClick={() => router.push(`/profiles/${user?.id}/settings/general`)}>Edit profile</Button>
          </div>
          </div>
        </div>
        {/* Sidebar and content */}
        <SideBar></SideBar>
      </div>



            </>
      )
}