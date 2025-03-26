import { Button } from '@/components/ui/button'
import BlogCard from '@/components/blogCard'
import { blogPostSources } from '@/config/site'
import { findUserById } from '@/server/user'

interface ProfileProps {
  params: { portfolioID: string }
}

export default async function  Profiles({ params }: ProfileProps) {

  const profileID: number = parseInt(params.portfolioID, 10) 
  
  const profiles: any = await findUserById(profileID)
  

  return (
    <div className='m-auto h-full w-[90%] justify-center'>
      <div className='flex h-full w-full'>
        {/* Avatar */}
        <div className='mb-4 ml-4 mr-6 mt-4 flex'>
          <img
            src={profiles.profilePic ?? undefined}
            width={210}
            height={200}
            alt='Avatar'
            className='rounded-[100%]'
          />
          {/* User Details */}
          <div className='ml-8 mt-4 flex h-full w-[95%] flex-col'>
            <h1 className='text-3xl font-bold'>{profiles?.name}</h1>
            <p className='text-break mt-4 text-md'>
            {profiles?.bio ? profiles.bio : <p className="text-red-500">No bio information available yet</p>}
            </p>
            {/* <Button variant='link' className='ml-0 w-full justify-start'>
              View more info
            </Button> */}
          </div>
          
        </div>
      </div>
      {/* Recent posts by this user */}
      <div className='mt-12'>
        <div className='mb-12 flex w-[92%] border-b-2 border-indigo-500'>
          {/* <Link className='mb-2 text-2xl font-medium' href='/profiles/[USERID]/all-posts'>
            All posts
          </Link> */}
        </div>
        <div className='grid h-full w-full grid-cols-1 overflow-hidden lg:grid-cols-3'>
          <BlogCard blogItems={blogPostSources.blogItems} />
        </div>
      </div>
    </div>
  )
}
