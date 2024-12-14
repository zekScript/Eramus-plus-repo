'use client'

import { useRouter, usePathname } from 'next/navigation'

interface NavLinkProps {
  navigateTo: string // The path to navigate to
  exact?: boolean // Whether the match should be exact
  className?: string // Optional CSS classes
  scroll?: boolean // Control scroll behavior on navigation
  children: React.ReactNode // Content inside the link
}

export default function NavLink({
  navigateTo,
  exact = false,
  className = '',
  scroll = true,
  children,
  ...props
}: NavLinkProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isActive = exact
    ? pathname === navigateTo
    : pathname.startsWith(navigateTo)
  const newClassName = isActive ? `${className} active` : className

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(navigateTo, { scroll })
  }

  return (
    <button onClick={handleClick} className={newClassName} {...props}>
      {children}
    </button>
  )
}
