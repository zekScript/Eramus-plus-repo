// 'use client'
import Image from 'next/image'
// import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import BlogCard from '@/components/blogCard'
import { blogPostSources } from '@/config/site'
import Link from 'next/link'
import { getCurrentUser } from '@/server/currentUser'
import prisma from '@/lib/db'
import NotFound from '@/app/not-found'
export default async function Profiles({
  params,
}: {
  params: { portfolioID: string }
}) {
  
  const profiles = await prisma.user.findUnique({
    where: { id: parseInt(params.portfolioID) },
  })

  // const path = usePathname()
  // const router = useRouter()
  // const handleRouteToSettings = () => {
  //   const newPath = path + '/settings/general'
  //   router.push(newPath)
  // }

  if(!profiles){
    return <NotFound />
  }

  const user = getCurrentUser()

  return (
    <div className='m-auto h-full w-[90%] justify-center'>
      <div className='flex h-full w-full'>
        {/* Avatar */}
        <div className='mb-4 ml-4 mr-6 mt-4 flex'>
          <Image
            src='/signinWallpaper.jpg'
            width={210}
            height={200}
            alt='Avatar'
            className='rounded-[100%]'
          ></Image>
          {/* User Details */}
          <div className='ml-8 mt-4 flex h-full w-[95%] flex-col'>
            <h1 className='text-3xl font-bold'>{profiles?.name}</h1>
            <p className='text-break mt-4 text-sm'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
              distinctio animi vero incidunt ullam expedita provident ut at enim
              voluptatem. Eum repudiandae dignissimos excepturi necessitatibus,
              optio repellat quas officia ipsa!
            </p>
            <Button variant='link' className='ml-0 w-full justify-start'>
              View more info
            </Button>
          </div>
          <div className='flex w-[30%] flex-col'>
            <div className='mt-3 flex h-full items-center justify-center'>
              <p className='flex h-full items-center'>Level</p>
              <div className='levelCircle ml-1 rounded-[100%]'>
                <p className='m-1'>10</p>
              </div>
            </div>

            <div className='flex justify-center'>
              {user?.id === Number(params.portfolioID) ? (
                <Button
                  // onClick={handleRouteToSettings}
                  className='mb-6 mt-14 w-2/3'
                  variant='outline'
                >
                  Edit Profile
                </Button>
              ) : <div className="mb-6 mt-14 w-2/3"></div> }

            </div>
          </div>
        </div>
      </div>
      {/* Recent posts by this user */}
      <div className='mt-12'>
        <div className='mb-12 flex w-[92%] border-b-2 border-indigo-500'>
          <Link className='mb-2 text-2xl font-medium' href='#'>
            Create a new post +
          </Link>
        </div>
        <div className='grid h-full w-full grid-cols-1 overflow-hidden lg:grid-cols-3'>
          <BlogCard blogItems={blogPostSources.blogItems} />
        </div>
      </div>
    </div>
  )
}
