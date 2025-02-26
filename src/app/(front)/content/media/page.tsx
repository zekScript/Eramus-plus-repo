import BlogCard from '@/components/blogCard'
import { blogPostSources } from '@/config/site'

const Media: React.FC = () => {
  return (
    <>
      <h1 className='mb-12 mt-12 text-center font-serif text-2xl'>
        Welcome to media were I write what I imagine
      </h1>
      <div className='m-auto grid h-full w-full grid-cols-1 gap-y-20 p-9 lg:grid-cols-3'>
        <BlogCard blogItems={blogPostSources.blogItems} />
      </div>
    </>
  )
}

export default Media
