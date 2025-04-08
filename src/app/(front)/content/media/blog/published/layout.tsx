"use client"
import { findPostById } from '@/server/post'


import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'


type WikiProps = {
  children: React.ReactNode;
};

const WikiLayout: React.FC<WikiProps> = ({ children }) => {
    
    // Accessing the search parameters correctly
    const searchParams = useSearchParams()
    const postId = searchParams.get('p') // Correctly accessing the 'p' parameter
  
    const [post, setPost] = useState<{
      id: string
      title: string
      content: string
      slug: string
      badge: string | null
      createdAt: Date
      published: boolean
      likes: number
      dislikes: number
      views: number
      updatedAt: Date
      authorId: number
    } | null>(null)
    const [user, setUser] = useState("")
  
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      if (!postId) return
  
      const fetchPost = async () => {
        try {
          const post = await findPostById(postId)
          setPost(post)
        } catch (error) {
          console.error('Error fetching post:', error)
        } finally {
          setLoading(false)
        }
      }
  
      fetchPost()
    }, [postId])

    

 console.log(post)

  return (
    <>
      {/* Main container */}
      <div className="flex flex-row w-full h-full">
       
        {/* Content */}
        <div className="w-full h-full flex ml-[15%]">
        {children}
          
          <div className="w-[55%] h-full">
            
          <div className='  w-full h-fulll'>
  <div className=''>
      


    <h3 className='text-lg font-semibold'>Post Details</h3>
      {!post ? (
            <p>Post unavailable</p>
      ) : (
            <div>
                  
                  <p><strong>Author ID:</strong> {post.authorId}</p>
                  <p><strong>Updated At:</strong> {new Date(post.updatedAt).toLocaleDateString()}</p>
            </div>
      )}
    
    {/* <p><strong>Updated At:</strong> {new Date(post.updatedAt).toLocaleDateString()}</p> */}
  </div>
</div>


          </div>
        </div>
      </div>
    </>
  );
};

export default WikiLayout;