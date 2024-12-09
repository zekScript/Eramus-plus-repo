import { getCurrentUser } from "@/server/currentUser"
import SideBarContent from "./sidebarContent"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function SideBar(){
      const router = useRouter()
      const user = getCurrentUser()
      return(
            <>
            <div className="w-full flex justify-end text-sm "><Button variant="link" onClick={() => router.push(`/profiles/${user?.id}`)}>Back To Your Profile</Button></div>
            <div className='flex justify-start w-full mt-2 bg-red-800 h-full'>
                  
            <div className="flex flex-col">
                {/* Settings */}
                <Button className='w-full justify-start mt-1' variant='outline'>General</Button>
                <Button className='w-full justify-start mt-1' variant='outline'>Avatar</Button>
                <Button className='w-full justify-start mt-1' variant='outline'>Profile Backround</Button>
                <Button className='w-full justify-start mt-1' variant='outline'>Theme</Button>
                <Button className='w-full justify-start mt-1' variant='outline'>Privacy Settings</Button>

            </div>
            <SideBarContent></SideBarContent>

        </div>
            
            </>
      )
}