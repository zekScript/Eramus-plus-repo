import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  direction?: string
  fullWidth?: boolean
  gap?: string
}

const Container = ({
  children,
  className,
  direction,
  fullWidth,
  gap,
}: ContainerProps) => {
  const defaultDirection = direction ? direction : `flex-col lg:flex-row`
  const defaultFullWidth = fullWidth ? '' : 'container'
  const defaultGap = gap ? gap : 'md:gap-x-10 xl:gap-x-20 gap-4'

  const combinedClassName = cn(
    'flex items-center justify-start',
    defaultDirection,
    defaultFullWidth,
    defaultGap,
    className
  )

  return <div className={combinedClassName}>{children}</div>
}
export default Container
