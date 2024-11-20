'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
// import { Badge } from '@/components/ui/badge'
import { BlogSourcesItem } from '@/types'
import { usePathname, useRouter } from 'next/navigation'

interface BlogProps {
  blogItems: BlogSourcesItem[]
}

const BlogCard: React.FC<BlogProps> = ({ blogItems }) => {
  const router = useRouter()
  const currentPath = usePathname()

  const handleRouting = (route: string) => {
    const newPath = currentPath + '/blog' + route
    router.push(newPath)
  }

  const truncateText = (text: string, length: number) =>
    text.length > length ? `${text.slice(0, length)}...` : text

  const blogList = blogItems?.map((blogItem) => (
    <div
      key={blogItem.id}
      className='mb-11 cursor-pointer transition-transform duration-500 hover:translate-y-[-10px] active:scale-90 active:shadow-sm'
      onClick={() => handleRouting(blogItem.route)}
    >
      <div className='text-break h-[370px] w-[350px] text-xl font-bold'>
        <img
          className='ratio rounded-xl'
          src={blogItem.src}
          alt={blogItem.title}
        />
        <div className='ml-2 mt-2'>
          {/* <Badge variant={blogItem.badge}>{blogItem.badge}</Badge> */}
          <h1>{blogItem.title}</h1>
          <p className='text-sm font-extralight'>{blogItem.date}</p>
          <p className='font-sm h-full w-full text-sm'>
            {truncateText(blogItem.description, 100)}
          </p>
          <div className='mt-3 flex items-center p-2'>
            <Avatar>
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <p className='ml-2 text-xs font-light'>Armandas Latanauskas</p>
          </div>
        </div>
      </div>
    </div>
  ))

  return <>{blogList}</>
}

export default BlogCard
