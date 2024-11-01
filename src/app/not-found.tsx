import { H1, P } from '@/components/typography'
import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

const NotFound: React.FC = () => {
  return (
    <div className='flex h-screen flex-col justify-between'>
      <div className='h-10'></div>
      <div className='flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div className='flex flex-col items-center justify-center space-y-4'>
            <AlertCircle className='mx-auto h-16 w-16 text-destructive' />
            <H1 className='text-center'>404</H1>
            <P className='text-center'>
              The page you are looking for does not exist. Please check the URL
              and try again.
            </P>
          </div>
          <div className='mt-8 space-y-6'>
            <div className='flex justify-center space-x-4'>
              <Link
                href='/'
                className={cn(
                  ''
                  // buttonVariants({ variant: 'default', size: 'lg' })
                )}
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NotFound
