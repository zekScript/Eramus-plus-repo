'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before checking theme (for SSR)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='flex items-center space-x-2'>
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={(isChecked) => setTheme(isChecked ? 'dark' : 'light')}
      />
    </div>
  )
}
