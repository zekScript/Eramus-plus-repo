import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const SidebarForPosts: React.FC = () => {
  const router = useRouter()

  return (
    <>
      {/* Sidebar for menu editing the text */}
      <div className='flex w-full justify-start bg-blue-500 text-sm'>
        <Button
          variant='link'
          onClick={() => router.push(`/profiles/[id]/create/[posteditid]`)}
        >
          Hello world
        </Button>
      </div>
    </>
  )
}

export default SidebarForPosts
