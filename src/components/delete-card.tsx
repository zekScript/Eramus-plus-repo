import React from 'react'
import { getCurrentUser } from '@/server/currentUser'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deletePost } from '@/server/post'

const DeleteCard: React.FC = () => {
  const user = getCurrentUser()
  const router = useRouter()
  const [confirmed, setConfirmed] = useState(false) // <-- checkbox state

  const handleSubmit = async () => {
    if (confirmed) {
      const result = await deletePost(post.id)
      setFeedbackDel(result)
      if (result.success) {
        router.push(`/profiles/${user?.id}/all-posts`)
      }
    } else {
      return null
    }
  }

  const cancelDelete = () => {
    setDeleteCard(false)
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full flex-col bg-black bg-opacity-50'>
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center rounded-lg border-2 bg-[#111] p-6 text-white shadow-2xl'>
          <div
            onClick={cancelDelete}
            className='flex w-full cursor-pointer justify-end'
          >
            <X size={24} />
          </div>
          <h1 className='mb-4 text-2xl'>Are you sure?</h1>

          <Separator></Separator>

          <div className='m-7 flex h-[75px] border-2 border-orange-500 bg-orange-400 bg-opacity-35 p-4'>
            <div className='flex items-center space-x-2'>
              <TriangleAlert size={24}></TriangleAlert>{' '}
              <h1>
                Warning: You are about to <strong>delete</strong> this post
              </h1>
            </div>
          </div>
          <div className='w-[70%]'>
            <p>
              Deleting this post there will be no going back nor recovering this
              post. this is the last warning
            </p>
          </div>

          <div className='mb-3 mt-5 flex space-x-2'>
            <input
              type='checkbox'
              onChange={(e) => setConfirmed(e.target.checked)}
            ></input>
            <p>Yes, I am sure. I want to delete this blog</p>
          </div>

          <div className='ml-2 mr-2 mt-4 flex w-full justify-center'>
            <button
              onClick={handleSubmit}
              className='w-full bg-[#1e1e1e] text-base'
            >
              Delete this post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteCard
