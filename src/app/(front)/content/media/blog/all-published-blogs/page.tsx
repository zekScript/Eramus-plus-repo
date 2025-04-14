import { getPosts } from './actions'

export default async function BlogPage() {
  const posts = await getPosts()

  const truncateText = (text: string, length: number) =>
    text.length > length ? `${text.slice(0, length)}...` : text

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

  // TODO: ADD PAGINATION HERE
  return (
    <div className='m-auto w-full p-6'>
      <div>{/* filter menu */}</div>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className='m-auto mb-6 flex w-[50%] justify-between space-y-6 border-b pb-4'
          >
            <div className='flex flex-col gap-2'>
              <div className='w-full'>
                <h2 className='text-lg font-semibold text-indigo-500'>
                  {post.title}
                </h2>
                <p className='text-sm'>{timeAgo(new Date(post.createdAt))}</p>
                <p className='font-sm h-full w-full text-sm text-gray-500'>
                  {truncateText(post.content, 200)}
                </p>
              </div>

              <div className='flex gap-3 text-sm font-semibold text-indigo-500'>
                {/* Extra options */}
                {/* <Link href='/stats'>Statistics</Link>
                <p>Views: 999</p>
                <p>Likes: 999</p>
                <p>Dislikes: 999</p> */}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
