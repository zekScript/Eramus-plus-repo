import { Button } from '@/components/ui/button'
import BlogCard from '@/components/blogCard'
import { blogPostSources } from '@/config/site'
import Link from 'next/link'
import NotFound from '@/app/not-found'
import { getProfileById } from './actions'
// import { useParams } from 'next/navigation'
// interface ProfileProps {
//   params: { portfolioID: string }
// }
// { params }: ProfileProps
export default function Profiles() {
  // const profiles = await getProfileById(params.portfolioID)

  // if (!profiles) {
  //   return <NotFound />
  // }

  return (
    <div className='m-auto h-full w-[90%] justify-center'>
      <div className='flex h-full w-full'>
        {/* Avatar */}
        <div className='mb-4 ml-4 mr-6 mt-4 flex'>
          <img
            // src={profiles.profilePic ?? undefined}
            width={210}
            height={200}
            alt='Avatar'
            className='rounded-[100%]'
          />
          {/* User Details */}
          <div className='ml-8 mt-4 flex h-full w-[95%] flex-col'>
            <h1 className='text-3xl font-bold'></h1>
            {/* {profiles.name} */}
            {/* {profiles?.name} */}
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
              <div className='ml-1 rounded-[100%] border-gray-600'>
                <p className='m-1'>0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent posts by this user */}
      <div className='mt-12'>
        <div className='mb-12 flex w-[92%] border-b-2 border-indigo-500'>
          <Link className='mb-2 text-2xl font-medium' href='/'>
            All posts
          </Link>
        </div>
        <div className='grid h-full w-full grid-cols-1 overflow-hidden lg:grid-cols-3'>
          <BlogCard blogItems={blogPostSources.blogItems} />
        </div>
      </div>
    </div>
  )
}
