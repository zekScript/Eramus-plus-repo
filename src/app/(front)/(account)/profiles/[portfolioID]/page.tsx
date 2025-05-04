import { findUserById } from '@/server/user'
import { getPostsMadeByYou } from './actions'
import Link from 'next/link'
import { getCurrentUserServer } from '@/server/currentUserServer'

interface ProfileProps {
  params: Promise<{ portfolioID: string }>
}

export default async function Profiles({ params }: ProfileProps) {
  const currentUser = await getCurrentUserServer()
  const posts = await getPostsMadeByYou()

  const truncateText = (text: string, length: number) =>
    text.length > length ? `${text.slice(0, length)}...` : text
  const resolvedParams = await params
  const profileID: number = parseInt(resolvedParams.portfolioID, 10)

  const profiles = await findUserById(profileID)

  function timeAgo(date: Date): string {
    const now: Date = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    }

    if (seconds > intervals.year * 5) {
      return `Posted on ${date.toLocaleDateString()}`
    }

    for (const [unit, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value)
      if (count > 0) {
        return `Posted ${count} ${unit}${count > 1 ? 's' : ''} ago`
      }
    }

    return 'Just now'
  }

  const profilePrivacy = profiles?.privacyVisabillity
  return (
    <div className='m-auto h-full w-[90%] justify-center'>
      <div className='flex h-full w-full'>
        {/* Avatar */}
        <div className='mb-4 mt-4 flex'>
          <img
            src={profiles?.profilePic ?? undefined}
            alt='Avatar'
            className='h-full w-[150px] rounded-[100%] sm:w-[210px]'
          />
          {/* User Details */}

          <div className='ml-8 mt-4 flex h-full w-[95%] flex-col'>
            <h1 className='text-3xl font-bold'>{profiles?.name}</h1>
            {profilePrivacy !== 'private' || currentUser?.id == profiles?.id ? (
              <div>
                <p className='text-break text-md mt-4'>
                  {profiles?.bio ? (
                    profiles.bio
                  ) : (
                    <p className='text-theme'>
                      No bio information available yet
                    </p>
                  )}
                </p>
              </div>
            ) : (
              <p className='mt-4 text-theme'>
                This profile is set to private by {profiles?.name}
              </p>
            )}

            {/* <Button variant='link' className='ml-0 w-full justify-start'>
            View more info
          </Button> */}
          </div>
        </div>
      </div>

      {profilePrivacy === 'public' || currentUser?.id == profiles?.id ? (
        <div className='mt-4'>
          <div className='mb-6 flex w-[100%] space-y-2 border-b-2 border-theme text-2xl font-bold'>
            <h1 className='mb-2'>Posts made by {profiles?.name}</h1>
          </div>
          <div className='grid h-full w-full overflow-hidden'>
            {posts.length === 0 ? (
              <p>No posts available</p>
            ) : (
              posts.slice(0, 8).map((post) => (
                <div key={post.id}>
                  {post.authorId === profiles?.id && (
                    <div className='mb-6 flex w-[100%] justify-between space-x-3 space-y-6 pb-4'>
                      <div className='flex flex-col gap-2'>
                        <div className='w-full'>
                          {/* <h2 >
                        {post.title}
                      </h2> */}
                          {/* fix it here */}
                          <h1
                            // href={`/content/media/blog/published/${post.slug}&?p=${post.id}`}
                            className='text-lg font-semibold text-indigo-500'
                          >
                            {post.title}
                          </h1>
                          <p className='text-sm text-gray-600'>
                            Posted by {profiles?.name}
                          </p>
                          <p className='text-md'>
                            {timeAgo(new Date(post.createdAt))}
                          </p>
                          <p className='font-sm h-full w-full text-sm text-neutral-400'>
                            {truncateText(post.content, 200)}
                          </p>
                        </div>

                        <div className='flex gap-3 text-sm font-semibold text-indigo-500'>
                          {/* Extra options */}
                          {/* <Link href='/my-account/stats'>Statistics</Link> */}
                          {/* <p>Views: 999</p>
                        <p>Likes: 999</p>
                        <p>Dislikes: 999</p> */}
                        </div>
                      </div>

                      {post.authorId === currentUser?.id && (
                        <div className='mb-2 flex justify-end space-y-2 text-sm'>
                          <Link
                            href={`/content/blogitems/edit?p=${post.id}`}
                            className='flex text-sm'
                          >
                            Post Properties
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
            {posts.length > 8 && (
              <div className='mt-4'>
                <Link
                  href={`/profiles/${profiles?.id}/all-posts`}
                  className='text-indigo-500'
                >
                  Checkout more posts
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  )
}
